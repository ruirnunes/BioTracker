import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';

interface Stats {
  totalSightings: number;
  distinctSpecies: number;

  sightingsPerType: {
    animal: number;
    plant: number;
    fungus: number;
  };

  mostActiveUser: {
    id: string;
    name: string;
    sightingsCount: number;
  } | null;

  latestSightings: {
    id: string;
    location: string;
    date: string;
    created_at: string;
    species: {
      id: string;
      common_name: string;
      genus: string;
      species: string;
      type: string;
    };
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

  stats = signal<Stats | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading.set(true);
    this.error.set('');

    this.api.get<Stats>('/users/me/stats').subscribe({
      next: (data) => {
        this.stats.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load stats');
        this.loading.set(false);
      },
    });
  }
}