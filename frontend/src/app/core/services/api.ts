import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  private normalizeUrl(url: string): string {
    return `${this.baseUrl}${url.startsWith('/') ? url : '/' + url}`;
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.normalizeUrl(url));
  }

  post<T, B>(url: string, body: B): Observable<T> {
    return this.http.post<T>(this.normalizeUrl(url), body);
  }

  put<T, B>(url: string, body: B): Observable<T> {
    return this.http.put<T>(this.normalizeUrl(url), body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.normalizeUrl(url));
  }
}