import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';

interface Stats {
  totalSightings: number;
  distinctSpecies: number;

  mySightings: number;

  sightingsPerType: Record<string, number>;

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
      type: string;
    };
    users: {
      id: string;
      name: string;
    };
  }[];
}

interface GlobalStats {
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
    location: string;
    date: string;
    created_at: string;
    species: {
      id: string;
      common_name: string;
      type: string;
    };
    users: {
      id: string;
      name: string;
    };
  }[];
}

interface UserStats {
  mySightings: number;
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

    Promise.all([
      this.api.get<GlobalStats>('/sightings/stats').toPromise(),
      this.api.get<UserStats>('/users/me/stats').toPromise()
    ])
      .then(([globalStats, userStats]) => {
        if (!globalStats || !userStats) {
          throw new Error('Invalid data');
        }

        this.stats.set({
          ...globalStats,
          mySightings: userStats.mySightings
        });

        this.loading.set(false);
      })
      .catch(() => {
        this.error.set('Failed to load stats');
        this.loading.set(false);
      });
  }
}