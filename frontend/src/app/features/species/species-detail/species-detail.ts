import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';
import { Species } from '../../../shared/models/species.model';

@Component({
  selector: 'app-species-detail',
  imports: [CommonModule],
  templateUrl: './species-detail.html',
  styleUrl: './species-detail.css',
})
export class SpeciesDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  species: Species | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Invalid species ID';
      this.loading = false;
      return;
    }

    this.api.get<Species>(`/species/${id}`).subscribe({
      next: (data) => {
        this.species = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load species';
        this.loading = false;
      }
    });
  }
}