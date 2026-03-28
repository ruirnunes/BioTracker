import { Component, inject, OnInit } from '@angular/core';
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

  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadSpecies();
  }

  loadSpecies(): void {
    this.loading = true;

    this.api.get<Species[]>('/species').subscribe({
      next: (data) => {
        this.species = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load species';
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    this.loading = true;

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
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to filter species';
        this.loading = false;
      },
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.loadSpecies();
  }
}