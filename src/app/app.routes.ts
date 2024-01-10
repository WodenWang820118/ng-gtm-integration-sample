import { Routes } from '@angular/router';
import { DestinationComponent } from './views/destination/destination.component';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './views/login/login.component';
import { BasketComponent } from './views/basket/basket.component';
import { DetailsComponent } from './views/details/details.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { ThankyouComponent } from './views/thankyou/thankyou.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'destinations', component: DestinationComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: '**', redirectTo: '' },
];
