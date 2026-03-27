import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, RouterModule],
  templateUrl: './species-list.html',
  styleUrl: './species-list.css',
})

export class SpeciesListComponent implements OnInit {
  private api = inject(ApiService);

  species: Species[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadSpecies();
  }

  loadSpecies(): void {
    this.loading = true;
    this.error = '';

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
}