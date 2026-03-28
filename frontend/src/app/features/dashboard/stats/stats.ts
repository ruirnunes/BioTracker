import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../../core/services/api';

interface Stats {
  totalSightings: number;
  distinctSpecies: number;
  mostActiveUser: {
    id: string;
    name: string;
    sightingsCount: number;
  } | null;
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

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = '';

    // ✅ FIXED ENDPOINT
    this.api.get<Stats>('/sightings/stats').subscribe({
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