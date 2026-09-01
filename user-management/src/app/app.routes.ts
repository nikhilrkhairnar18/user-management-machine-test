import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login').then((m) => m.Login),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/user-dashboard').then((m) => m.UserDashboard),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];