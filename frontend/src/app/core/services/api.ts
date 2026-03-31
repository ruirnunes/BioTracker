import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl;

  /**
   * Ensures consistent URL formatting:
   * - avoids double slashes
   * - ensures baseUrl is always prepended
   */
  private normalizeUrl(url: string): string {
    return `${this.baseUrl}${url.startsWith('/') ? url : '/' + url}`;
  }

  /**
   * GET request
   */
  get<T>(url: string): Observable<T> {
    const fullUrl = this.normalizeUrl(url);
    console.log('API GET →', fullUrl);

    return this.http.get<T>(fullUrl);
  }

  /**
   * POST request
   */
  post<T, B>(url: string, body: B): Observable<T> {
    const fullUrl = this.normalizeUrl(url);

    console.log('API POST →', fullUrl, body);

    return this.http.post<T>(fullUrl, body);
  }

  /**
   * PUT request
   */
  put<T, B>(url: string, body: B): Observable<T> {
    const fullUrl = this.normalizeUrl(url);

    console.log('API PUT →', fullUrl, body);

    return this.http.put<T>(fullUrl, body);
  }

  /**
   * DELETE request
   */
  delete<T>(url: string): Observable<T> {
    const fullUrl = this.normalizeUrl(url);

    console.log('API DELETE →', fullUrl);

    return this.http.delete<T>(fullUrl);
  }
}