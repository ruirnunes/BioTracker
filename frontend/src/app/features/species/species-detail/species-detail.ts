import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';
import { Species } from '../../../shared/models/species.model';

@Component({
  selector: 'app-species-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './species-detail.html',
  styleUrl: './species-detail.css',
})
export class SpeciesDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);

  species: Species | null = null;

  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Invalid species ID');
      this.loading.set(false);
      return;
    }

    this.api.get<Species>(`/species/${id}`).subscribe({
      next: (data) => {
        this.species = data;
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load species');
        this.loading.set(false);
      }
    });
  }

  deleteSpecies(): void {
    if (!this.species) return;

    const confirmDelete = confirm(
      `Delete "${this.species.common_name}"?`
    );

    if (!confirmDelete) return;

    this.api.delete(`/species/${this.species.id}`).subscribe({
      next: () => {
        this.router.navigate(['/species']);
      },
      error: () => {
        this.error.set('Failed to delete species');
      }
    });
  }
}