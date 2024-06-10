import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./modules/product/routes').then((m) => m.PRODUCT_ROUTES),
  },
  {
    path: 'transaction',
    loadChildren: () =>
      import('./modules/transaction/routes').then((m) => m.TRANSACTION_ROUTES),
  },
  // { path: '**', redirectTo: '' },
];
