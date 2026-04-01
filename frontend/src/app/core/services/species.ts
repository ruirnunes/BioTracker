import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api';
import {
  Species,
  CreateSpeciesDto,
  UpdateSpeciesDto,
} from '../../shared/models/species.model';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private api = inject(ApiService);

  getAll(): Observable<Species[]> {
    return this.api.get<Species[]>('/species');
  }

  getById(id: string): Observable<Species> {
    return this.api.get<Species>(`/species/${id}`);
  }

  create(payload: CreateSpeciesDto): Observable<Species> {
    return this.api.post<Species, CreateSpeciesDto>('/species', payload);
  }

  update(id: string, payload: UpdateSpeciesDto): Observable<Species> {
    return this.api.put<Species, UpdateSpeciesDto>(`/species/${id}`, payload);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`/species/${id}`);
  }
}