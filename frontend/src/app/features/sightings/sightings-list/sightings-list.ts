import { Component, inject, OnInit } from '@angular/core';
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
}