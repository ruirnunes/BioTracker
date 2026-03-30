import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../core/services/api';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})

export class AuthComponent {
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  isLogin = true;
  error = '';
  loading = false;

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.error = '';
  }

  submit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    const url = this.isLogin ? '/auth/login' : '/auth/register';

    this.api.post<{ access_token: string }, { email: string; password: string }>(
      url,
      { email: this.email, password: this.password }
    ).subscribe({
      next: (res) => {
        this.loading = false;
        this.auth.setToken(res.access_token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Authentication error';
      }
    });
  }
}