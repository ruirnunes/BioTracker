import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiService } from '../../../core/services/api';
import { Sighting } from '../../../shared/models/sighting.model';
import { LoadingComponent } from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-sightings-list',
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './sightings-list.html',
  styleUrl: './sightings-list.css',
})
export class SightingListComponent implements OnInit {
  private api = inject(ApiService);

  sightings: Sighting[] = [];
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.loadSightings();
  }

  loadSightings(): void {
    this.loading.set(true);
    this.error.set('');

    this.api.get<Sighting[]>('/sightings').subscribe({
      next: (data) => {
        this.sightings = data;
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load sightings') 
        this.loading.set(false);
      },
    });
  }
}