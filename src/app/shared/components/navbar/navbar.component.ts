import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AnalyticsService } from 'src/app/shared/services/analytics/analytics.service';
import { OrderService } from '../../services/order/order.service';
import { map, take, tap } from 'rxjs';
import { NavbarClickDirective } from '../../directives/navbar-click/navbar-click.directive';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarClickDirective],
  templateUrl: './navbar.component.html',
  styles: [
    `
      .navbar {
        color: #999;
        background-color: #2c2c2c;
      }

      .nav-item,
      .navbar-brand {
        cursor: pointer;
      }

      #navBasketItems span {
        color: steelblue;
      }
    `,
  ],
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

  navigateToAdmin() {
    this.navigationService.navigateToAdmin();
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
