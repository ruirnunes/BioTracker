import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface SupabaseUser {
  id: string;
  email?: string;
}

export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  token_type: string;
  user: SupabaseUser;
}

export interface LoginResponse {
  user: SupabaseUser;
  session: SupabaseSession | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.api}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((res: LoginResponse) => {
          const token = res.session?.access_token;

          if (token) {
            localStorage.setItem('token', token);
          }
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.api}/auth/register`, {
        name,
        email,
        password,
      })
      .pipe(
        tap((res: LoginResponse) => {
          const token = res.session?.access_token;

          if (token) {
            localStorage.setItem('token', token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && token !== 'undefined' && token !== 'null';
  }
}