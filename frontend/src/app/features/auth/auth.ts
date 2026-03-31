import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../core/services/api';
import { AuthService } from '../../core/services/auth';

interface AuthResponse {
  access_token: string | null;
}

interface AuthRequest {
  email: string;
  password: string;
}

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

    this.api.post<AuthResponse, AuthRequest>(
      url,
      { email: this.email, password: this.password }
    ).subscribe({
      next: (res) => {
        this.loading = false;

        if (!res.access_token) {
          this.error = 'No token received. Please try logging in.';
          return;
        }

        this.auth.setToken(res.access_token);
        this.router.navigate(['/']);
      },
      error: (err: { error?: { message?: string } }) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Authentication error';
      }
    });
  }
}