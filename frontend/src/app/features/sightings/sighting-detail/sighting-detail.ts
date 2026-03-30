import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../shared/components/loading/loading';

import { ApiService } from '../../../core/services/api';
import { Sighting } from '../../../shared/models/sighting.model';

@Component({
  selector: 'app-sighting-detail',
  imports: [CommonModule, RouterLink, LoadingComponent],
  templateUrl: './sighting-detail.html',
  styleUrl: './sighting-detail.css',
})
export class SightingDetailComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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

  // DELETE
  delete(): void {
    if (!this.sighting?.id) return;

    const confirmDelete = confirm('Are you sure you want to delete this sighting?');

    if (!confirmDelete) return;

    this.api.delete(`/sightings/${this.sighting.id}`).subscribe({
      next: () => {
        this.router.navigate(['/sightings']);
      },
      error: () => {
        this.error = 'Failed to delete sighting';
      }
    });
  }
}