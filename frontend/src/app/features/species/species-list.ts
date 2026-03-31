import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../core/services/api';

export interface Species {
  id: string;
  common_name: string;
  genus: string;
  species: string;
  type: 'animal' | 'plant' | 'fungus';
}

@Component({
  selector: 'app-species-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './species-list.html',
  styleUrl: './species-list.css',
})
export class SpeciesListComponent implements OnInit {
  private api = inject(ApiService);

  species: Species[] = [];

  searchTerm = '';
  selectedType = '';

  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.loadSpecies();
  }

  loadSpecies(): void {
    this.loading.set(true);

    this.api.get<Species[]>('/species').subscribe({
      next: (data) => {
        this.species = data;
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load species');
        this.loading.set(false);
      },
    });
  }

  applyFilters(): void {
    this.loading.set(true);

    const params = [];

    if (this.searchTerm.trim()) {
      params.push(`q=${this.searchTerm}`);
    }

    if (this.selectedType) {
      params.push(`type=${this.selectedType}`);
    }

    const queryString = params.length ? `?${params.join('&')}` : '';

    this.api.get<Species[]>(`/species/search${queryString}`).subscribe({
      next: (data) => {
        this.species = data;
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to filter species')
        this.loading.set(false);
      },
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.loadSpecies();
  }
}