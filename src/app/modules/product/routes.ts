export const PRODUCT_ROUTES = [
  {
    path: 'destinations',
    loadComponent: () =>
      import('./views/destination/destination.component').then(
        (m) => m.DestinationComponent
      ),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./views/details/details.component').then(
        (m) => m.DetailsComponent
      ),
  },
];
