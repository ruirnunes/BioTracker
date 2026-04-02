import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';

  isLogin = true;

  error = signal('');
  loading = signal(false);

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.error.set('');
    this.name = '';
    this.email = '';
    this.password = '';
  }

  submit(): void {
    if (!this.email || !this.password || (!this.isLogin && !this.name)) {
      this.error.set('Please fill in all fields');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const request$ = this.isLogin
      ? this.auth.login(this.email, this.password)
      : this.auth.register(this.name, this.email, this.password);

    request$.subscribe({
      next: (res) => {
        this.loading.set(false);

        const token = res.session?.access_token;

        if (!token) {
          this.error.set('Authentication failed');
          return;
        }

        this.router.navigate(['/dashboard']);
      },

      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? 'Authentication error');
      },
    });
  }
}