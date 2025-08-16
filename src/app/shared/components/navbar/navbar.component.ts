import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AnalyticsService } from 'src/app/shared/services/analytics/analytics.service';
import { OrderService } from '../../services/order/order.service';
import { map, take, tap } from 'rxjs';
import { NavigationService } from '../../services/navigation/navigation.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, ToolbarModule, ButtonModule, AsyncPipe],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(
    public readonly authService: AuthService,
    private readonly orderService: OrderService,
    private readonly analyticsService: AnalyticsService,
    private readonly navigationService: NavigationService
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

  navigateToAddData() {
    this.navigationService.navigateToAddData();
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
