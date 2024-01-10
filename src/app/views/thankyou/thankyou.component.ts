import { Component } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { SharedModule } from 'src/app/shared.module';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { take, tap } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-thankyou',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss'],
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
