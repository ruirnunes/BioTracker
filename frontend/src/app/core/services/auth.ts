import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private tokenKey = 'access_token';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const parts = token.split('.');
    if (parts.length !== 3) return false;

    try {
      const payload = JSON.parse(atob(parts[1]));
      return payload?.exp ? payload.exp * 1000 > Date.now() : false;
    } catch {
      return false;
    }
  }
}