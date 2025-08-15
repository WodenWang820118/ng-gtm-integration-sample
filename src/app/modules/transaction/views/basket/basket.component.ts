import { Component } from '@angular/core';
import { OrderService } from '../../../../shared/services/order/order.service';
import { Order } from 'src/app/shared/models/order.model';
import { WindowSizeService } from '../../../../shared/services/window-size/window-size.service';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-basket',
    imports: [AsyncPipe],
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  basketItems$ = this.orderService.orders$;

  constructor(
    public orderService: OrderService,
    public windowSizeService: WindowSizeService,
    private navigationService: NavigationService
  ) {}

  navigateToBeginCheckout() {
    this.navigationService.navigateToCheckout();
  }

  updateCart(orderId: string) {
    this.navigationService.navigateToDetail(orderId);
  }

  removeFromCart(order: Order): void {
    this.orderService.removeFromCart(order);
  }

  calculateTotalPrice() {
    return this.orderService.calculateTotalPrice();
  }

  beginCheckout() {
    this.orderService.beginCheckout();
  }
}
