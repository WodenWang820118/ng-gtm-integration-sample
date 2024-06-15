import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
];
