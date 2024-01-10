import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Destination } from 'src/app/models/destination.model';
import { Order } from 'src/app/models/order.model';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _orders = new BehaviorSubject<Order[]>([]);
  private _totalPrice = this.calculateTotalPrice();

  constructor(private analyticsService: AnalyticsService) {
    this.loadInitialData();
  }

  get orders$(): Observable<Order[]> {
    return this._orders.asObservable();
  }

  get totalPrice$(): Observable<number> {
    return this._totalPrice;
  }

  addToCart(destination$: Observable<Destination>, numOfPersons: number): void {
    destination$
      .pipe(
        take(1),
        map((destination) => this.createOrder(destination, numOfPersons)),
        tap((order) => {
          const currentOrders = this._orders.value;
          const duplicateOrderIndex = currentOrders.findIndex(
            (o) => o.id === order.id
          );

          if (duplicateOrderIndex !== -1) {
            currentOrders[duplicateOrderIndex] = this.updateOrderQuantity(
              currentOrders[duplicateOrderIndex],
              order.quantity
            );
          } else {
            currentOrders.push(order);
          }

          this._orders.next(currentOrders);
          this.storeOrders(currentOrders);
          this.analyticsService.trackEvent('add_to_cart', [order]);
        })
      )
      .subscribe();
  }

  removeFromCart(order: Order): void {
    const currentOrders = this._orders.value;
    const updatedOrders = currentOrders.filter((item) => item.id !== order.id);
    this._orders.next(updatedOrders);
    this.analyticsService.trackEvent('remove_from_cart', [order]);
    this.storeOrders(updatedOrders);
  }

  beginCheckout(): void {
    this.analyticsService.trackEvent('begin_checkout', this._orders.value);
  }

  calculateTotalPrice() {
    return this.orders$.pipe(
      map((orders) =>
        orders.reduce((total, order) => total + order.value * order.quantity, 0)
      )
    );
  }

  resetOrders(): void {
    this._orders.next([]);
    this.storeOrders([]);
  }

  private loadInitialData(): void {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    this._orders.next(orders);
  }

  private storeOrders(orders: Order[]): void {
    localStorage.setItem('orders', JSON.stringify(orders));
    this.analyticsService.setCheckoutOrders(orders);
  }

  private createOrder(destination: Destination, numOfPersons: number): Order {
    return {
      id: destination.id,
      title: destination.title,
      category: destination.title,
      value: destination.price,
      quantity: numOfPersons,
      date: new Date(),
      image: destination.image1,
      currency: 'USD',
    };
  }

  private updateOrderQuantity(order: Order, quantity: number): Order {
    return {
      ...order,
      quantity,
    };
  }
}
