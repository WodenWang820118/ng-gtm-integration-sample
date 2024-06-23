import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { DisclaimerComponent } from '../../../../shared/components/disclaimer/disclaimer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-transaction-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    DisclaimerComponent,
    RouterOutlet,
  ],
  template: `
    <app-navbar></app-navbar>
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-disclaimer></app-disclaimer>
  `,
  styles: [``],
})
export class HomeComponent {}
