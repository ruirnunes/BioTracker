import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // Default redirect
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sightings',
  },

  // Auth
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth').then((m) => m.AuthComponent),
  },

  // Sightings (protected)
  {
    path: 'sightings',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/sightings/sightings-list/sightings-list')
            .then((m) => m.SightingListComponent),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/sightings/sighting-form/sighting-form')
            .then((m) => m.SightingFormComponent),
      },
      {
      path: 'edit/:id', // 👈 ADD THIS
      loadComponent: () =>
        import('./features/sightings/sighting-form/sighting-form')
          .then((m) => m.SightingFormComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/sightings/sighting-detail/sighting-detail')
            .then((m) => m.SightingDetailComponent),
      },
    ],
  },

  // Species (protected)
  {
    path: 'species',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/species/species-list')
        .then((m) => m.SpeciesListComponent),
  },

  {
    path: 'species/:id',
    loadComponent: () =>
      import('./features/species/species-detail/species-detail')
        .then(m => m.SpeciesDetailComponent)
  },

  // Dashboard (protected)
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/stats/stats')
        .then((m) => m.StatsComponent),
  },

  // Fallback
  {
    path: '**',
    redirectTo: 'sightings',
  },
];