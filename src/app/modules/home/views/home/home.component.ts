import { Component } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { DisclaimerComponent } from '../../../../shared/components/disclaimer/disclaimer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    FooterComponent,
    NavbarComponent,
    DisclaimerComponent,
    RouterOutlet,
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-navbar class="bg-white shadow"></app-navbar>
      <main class="flex-grow container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
      <app-footer class="bg-gray-100"></app-footer>
      <app-disclaimer
        class="text-xs text-center text-gray-500 py-4"
      ></app-disclaimer>
    </div>
  `,
  styles: [``],
})
export class HomeComponent {}
