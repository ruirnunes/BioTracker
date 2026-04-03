import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api';
import { Sighting } from '../../../shared/models/sighting.model';
import { LoadingComponent } from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-sighting-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './sighting-detail.html',
  styleUrl: './sighting-detail.css',
})
export class SightingDetailComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  sighting: Sighting | null = null;

  loading = signal(true);
  error = signal<string>('');   // 👈 transformado em signal

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Invalid sighting ID');
      this.loading.set(false);
      return;
    }

    this.api.get<Sighting>(`/sightings/${id}`).subscribe({
      next: (data) => {
        this.sighting = data;
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);

        if (err.status === 404) {
          this.error.set('Sighting not found');
          return;
        }

        this.error.set(err.error?.error || 'Failed to load sighting');
      }
    });
  }

  delete(): void {
    if (!this.sighting?.id) return;

    this.api.delete(`/sightings/${this.sighting.id}`).subscribe({
      next: () => {
        this.router.navigate(['/sightings']);
      },
      error: (err) => {
        if (err.status === 403) {
          this.error.set('You are not allowed to delete this sighting');
          return;
        }

        if (err.status === 404) {
          this.error.set('Sighting not found');
          return;
        }

        this.error.set(err.error?.error || 'Delete failed');
      }
    });
  }
}