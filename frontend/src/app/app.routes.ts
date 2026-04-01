import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },

  // AUTH
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth').then(m => m.AuthComponent),
  },

  // SIGHTINGS
  {
    path: 'sightings',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/sightings/sightings-list/sightings-list')
            .then(m => m.SightingsListComponent),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/sightings/sighting-form/sighting-form')
            .then(m => m.SightingFormComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/sightings/sighting-form/sighting-form')
            .then(m => m.SightingFormComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/sightings/sighting-detail/sighting-detail')
            .then(m => m.SightingDetailComponent),
      },
    ],
  },

  // SPECIES (ORDEM CORRETA 👇)
  {
    path: 'species/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/species/species-form/species-form')
        .then(m => m.SpeciesFormComponent),
  },
  {
    path: 'species/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/species/species-form/species-form')
        .then(m => m.SpeciesFormComponent),
  },
  {
    path: 'species/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/species/species-detail/species-detail')
        .then(m => m.SpeciesDetailComponent),
  },
  {
    path: 'species',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/species/species-list')
        .then(m => m.SpeciesListComponent),
  },

  // DASHBOARD
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/stats/stats')
        .then(m => m.StatsComponent),
  },

  {
    path: '**',
    redirectTo: 'sightings',
  },
];