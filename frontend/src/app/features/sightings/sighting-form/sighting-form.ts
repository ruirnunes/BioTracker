import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../core/services/api';
import { Species } from '../../../shared/models/species.model';
import { Sighting } from '../../../shared/models/sighting.model';

@Component({
  selector: 'app-sighting-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sighting-form.html',
  styleUrl: './sighting-form.css',
})
export class SightingFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  speciesList = signal<Species[]>([]);

  loading = false;
  error = '';
  submitted = false;

  // EDIT MODE
  isEdit = false;
  id: string | null = null;

  form = this.fb.group({
    species_id: ['', Validators.required],
    location: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(120)]
    ],
    date: ['', Validators.required],
    image_url: ['']
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.isEdit = true;
      this.loadSighting(this.id);
    }

    this.loadSpecies();
  }

  loadSpecies(): void {
    this.api.get<Species[]>('/species').subscribe({
      next: (data) => (this.speciesList.set(data)),
      error: () => (this.error = 'Failed to load species'),
    });
  }

  loadSighting(id: string): void {
    this.api.get<Sighting>(`/sightings/${id}`).subscribe({
      next: (data) => {
        this.form.patchValue({
          species_id: data.species_id,
          location: data.location,
          date: data.date,
          image_url: data.image_url
        });
      },
      error: () => {
        this.error = 'Failed to load sighting';
      }
    });
  }

  submit(): void {
    this.submitted = true;
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Please fix the errors in the form.';
      return;
    }

    const value = this.form.value;

    // Prevent future dates
    const selectedDate = new Date(value.date!);
    const today = new Date();

    if (selectedDate > today) {
      this.error = 'Date cannot be in the future.';
      return;
    }

    this.loading = true;

    const request = this.isEdit
      ? this.api.put(`/sightings/${this.id}`, value)
      : this.api.post('/sightings', value);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/sightings']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message ?? 'Operation failed';
      },
    });
  }

  get f() {
    return this.form.controls;
  }
}