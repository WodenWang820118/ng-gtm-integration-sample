export const HOME_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./views/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/login/login.component').then((m) => m.LoginComponent),
  },
];
