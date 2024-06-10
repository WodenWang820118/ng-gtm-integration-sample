import { Component } from '@angular/core';
import { OrderService } from '../../../../shared/services/order/order.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/shared/models/order.model';
import { WindowSizeService } from '../../../../shared/services/window-size/window-size.service';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [AsyncPipe, FontAwesomeModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  basketItems$ = this.orderService.orders$;
  faTrashCan = faTrashCan;
  faEdit = faEdit;

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
