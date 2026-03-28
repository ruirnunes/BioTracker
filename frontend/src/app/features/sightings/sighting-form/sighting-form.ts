import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../../core/services/api';
import { Species } from '../../../shared/models/species.model';

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

  speciesList: Species[] = [];

  loading = false;
  error = '';
  submitted = false;

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
    this.loadSpecies();
  }

  loadSpecies(): void {
    this.api.get<Species[]>('/species').subscribe({
      next: (data) => (this.speciesList = data),
      error: () => (this.error = 'Failed to load species'),
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

    this.api.post('/sightings', value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/sightings']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message ?? 'Failed to create sighting';
      },
    });
  }

  get f() {
    return this.form.controls;
  }
}