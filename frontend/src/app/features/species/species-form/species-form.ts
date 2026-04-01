import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SpeciesService } from '../../../core/services/species';
import {
  Species,
  CreateSpeciesDto,
  SpeciesType,
} from '../../../shared/models/species.model';

@Component({
  selector: 'app-species-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './species-form.html',
  styleUrl: './species-form.css',
})
export class SpeciesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private speciesService = inject(SpeciesService);

  isEdit = false;
  loading = signal(false);
  error = '';

  private speciesId: string | null = null;

  form = this.fb.group({
    common_name: this.fb.nonNullable.control<string>('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    genus: this.fb.nonNullable.control<string>('', Validators.required),
    species: this.fb.nonNullable.control<string>('', Validators.required),
    type: this.fb.nonNullable.control<SpeciesType | ''>('', Validators.required),
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.speciesId = id;
      this.loadSpecies(id);
    }
  }

  loadSpecies(id: string): void {
    this.speciesService.getById(id).subscribe({
      next: (species: Species) => {
        this.form.patchValue({
          common_name: species.common_name,
          genus: species.genus,
          species: species.species,
          type: species.type,
        });
      },
      error: (err) => {
        console.error('LOAD ERROR:', err);
        this.error = 'Failed to load species';
      },
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error = '';

    const raw = this.form.getRawValue();

    const payload: CreateSpeciesDto = {
      common_name: raw.common_name,
      genus: raw.genus,
      species: raw.species,
      type: raw.type as SpeciesType,
    };

    const request$ =
      this.isEdit && this.speciesId
        ? this.speciesService.update(this.speciesId, payload)
        : this.speciesService.create(payload);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/species']);
      },
      error: (err) => {
        console.error('SAVE ERROR:', err);
        this.loading.set(false);
        this.error = err?.error?.message ?? 'Save failed';
      },
    });
  }
}