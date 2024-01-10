import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { OrderService } from 'src/app/services/order/order.service';
import { map, take, tap } from 'rxjs';
import { NavbarClickDirective } from 'src/app/directives/navbar-click.directive';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarClickDirective],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private orderService: OrderService,
    private analyticsService: AnalyticsService,
    private navigationService: NavigationService
  ) {}

  navigateToHome() {
    this.navigationService.navigateToHome();
  }

  navigateToDestinations() {
    this.navigationService.navigateToDestinations();
  }

  navigateToLogin() {
    this.navigationService.navigateToLogin();
  }

  navigateToBasket() {
    this.navigationService.navigateToBasket();
  }

  trackViewCart(): void {
    this.orderService.orders$
      .pipe(
        take(1),
        tap((orders) => {
          this.analyticsService.trackEvent('view_cart', orders);
        })
      )
      .subscribe();
  }

  numOfItemsInCart() {
    return this.orderService.orders$.pipe(
      take(1),
      map((orders) => orders.length)
    );
  }
}
