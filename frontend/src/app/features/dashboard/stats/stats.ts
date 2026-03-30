import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';

interface Stats {
  totalSightings: number;
  distinctSpecies: number;
  sightingsPerType: Record<string, number>;

  mostActiveUser: {
    id: string;
    name: string;
    sightingsCount: number;
  } | null;

  latestSightings: {
    id: string;
    species_id: string;
    created_at: string;
  }[];
}

@Component({
  selector: 'app-stats',
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class StatsComponent implements OnInit {
  private api = inject(ApiService);

  stats: Stats | null = null;
  loading = true;
  error = '';

  objectKeys = Object.keys;

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = '';

    this.api.get<Stats>('/users/me/stats').subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load stats';
        this.loading = false;
      },
    });
  }
}