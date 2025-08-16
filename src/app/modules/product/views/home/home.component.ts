import { Component } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { DisclaimerComponent } from '../../../../shared/components/disclaimer/disclaimer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-home',
  imports: [
    FooterComponent,
    NavbarComponent,
    DisclaimerComponent,
    RouterOutlet,
  ],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-disclaimer></app-disclaimer>
  `,
  styles: [``],
})
export class HomeComponent {}
