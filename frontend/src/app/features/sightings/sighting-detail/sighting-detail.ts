import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../core/services/api';

interface Sighting {
  id: string;
  species: string;
  location: string;
  description: string;
  date: string;
}
@Component({
  selector: 'app-sighting-detail',
  imports: [CommonModule],
  templateUrl: './sighting-detail.html',
  styleUrl: './sighting-detail.css',
})

export class SightingDetailComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  sighting: Sighting | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Invalid sighting ID';
      this.loading = false;
      return;
    }

    this.loadSighting(id);
  }

  loadSighting(id: string): void {
    this.loading = true;

    this.api.get<Sighting>(`/sightings/${id}`).subscribe({
      next: (data) => {
        this.sighting = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load sighting';
        this.loading = false;
      },
    });
  }
}
