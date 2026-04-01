import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
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

  private readonly _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  readonly isLoggedIn$ = this._isLoggedIn.asObservable();

  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token && token !== 'undefined' && token !== 'null';
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.api}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          const token = res.session?.access_token;

          if (token) {
            localStorage.setItem('token', token);
            this._isLoggedIn.next(true);
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
        tap((res) => {
          const token = res.session?.access_token;

          if (token) {
            localStorage.setItem('token', token);
            this._isLoggedIn.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._isLoggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}