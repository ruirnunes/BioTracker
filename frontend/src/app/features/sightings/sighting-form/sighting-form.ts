import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-sighting-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sighting-form.html',
  styleUrl: './sighting-form.css',
})

export class SightingFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  error = '';
  submitted = false;

  form = this.fb.group({
    species: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80),
        Validators.pattern(/^(?!\d+$).+/), // not only numbers
      ],
    ],
    location: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(120),
      ],
    ],
    date: [
      '',
      [
        Validators.required,
      ],
    ],
    description: [
      '',
      [
        Validators.maxLength(300),
      ],
    ],
  });

  submit() {
    this.submitted = true;
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Please fix the errors in the form.';
      return;
    }

    const value = this.form.value;

    // Date validation (no future sightings)
    const selectedDate = new Date(value.date!);
    const today = new Date();

    if (selectedDate > today) {
      this.error = 'Date cannot be in the future.';
      return;
    }

    this.api.post('/sightings', value).subscribe({
      next: () => this.router.navigate(['/sightings']),
      error: (err) => {
        this.error = err.error?.message ?? 'Failed to create sighting';
      },
    });
  }

  get f() {
    return this.form.controls;
  }
}
