import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ApiService } from '../../../core/services/api';
import { AuthService } from '../../../core/services/auth';
import { Sighting } from '../../../shared/models/sighting.model';

@Component({
  selector: 'app-sightings-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sightings-list.html',
  styleUrl: './sightings-list.css',
})
export class SightingsListComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);

  // SIGNALS
  sightings = signal<Sighting[]>([]);
  searchTerm = signal<string>('');
  showMineOnly = signal<boolean>(false);
  sortDesc = signal<boolean>(true);

  // DERIVED STATE (auto recalculated)
  filteredSightings = computed(() => {
    let data = [...this.sightings()];

    // filter mine
    if (this.showMineOnly()) {
      const userId = this.getCurrentUserId();

      if (userId) {
        data = data.filter(s => s.users?.id === userId);
      }
    }

    // search
    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
      data = data.filter(s =>
        s.location?.toLowerCase().includes(term) ||
        s.species?.common_name?.toLowerCase().includes(term)
      );
    }

    // sort
    data.sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return this.sortDesc() ? bDate - aDate : aDate - bDate;
    });

    return data;
  });

  ngOnInit(): void {
    this.loadSightings();
  }

  // LOAD
  loadSightings(): void {
    this.api.get<Sighting[]>('/sightings').subscribe({
      next: (data) => {
        this.sightings.set(data);
      },
      error: (err) => {
        console.error('Error loading sightings:', err);
      },
    });
  }

  // TOGGLE MINE
  toggleMySightings(): void {
    console.log('USER ID JWT:', this.getCurrentUserId());
    console.log('SIGHTINGS USER IDS:', this.sightings().map(s => s.user_id));
    this.showMineOnly.update(v => !v);
  }

  // TOGGLE SORT
  toggleSort(): void {
    this.sortDesc.update(v => !v);
  }

  // SEARCH
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  // JWT
  private getCurrentUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch {
      return null;
    }
  }
}