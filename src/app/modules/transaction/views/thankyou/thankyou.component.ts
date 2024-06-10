import { Component } from '@angular/core';
import { OrderService } from '../../../../shared/services/order/order.service';
import { AnalyticsService } from '../../../../shared/services/analytics/analytics.service';
import { take, tap } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-thankyou',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './thankyou.component.html',
})
export class ThankyouComponent {
  constructor(
    public orderService: OrderService,
    private analyticsService: AnalyticsService,
    private navigationService: NavigationService
  ) {}

  resetOrders(): void {
    this.orderService.resetOrders();
    this.navigationService.navigateToHome();
  }

  // the purchase event is tracked in the analytics service using URL to determine when to track the event
  trackRefund(): void {
    this.orderService.orders$
      .pipe(
        take(1),
        tap((orders) => {
          this.analyticsService.trackEvent('refund', orders);
        })
      )
      .subscribe();
  }
}
