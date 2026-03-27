import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ApiService } from '../../../core/services/api';

export interface Sighting {
  id: string;
  species: string;
  location: string;
  date: string;
}

@Component({
  selector: 'app-sightings-list',
  imports: [CommonModule,RouterModule ],
  templateUrl: './sightings-list.html',
  styleUrl: './sightings-list.css',
})

export class SightingListComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  sightings: Sighting[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadSightings();
  }

  loadSightings(): void {
    this.loading = true;
    this.error = '';

    this.api.get<Sighting[]>('/sightings').subscribe({
      next: (data) => {
        this.sightings = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load sightings';
        this.loading = false;
      },
    });
  }

  openDetail(id: string): void {
    this.router.navigate(['/sightings', id]);
  }
}