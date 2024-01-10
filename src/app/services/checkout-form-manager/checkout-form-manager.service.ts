import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, take, tap } from 'rxjs';
import { AnalyticsService } from '../analytics/analytics.service';
import { OrderService } from '../order/order.service';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFormManagerService {
  shippingForm = this.fb.group({
    name: [''],
    address: [''],
    zip: [''],
    city: [''],
  });

  paymentForm = this.fb.group({
    cardNum: [''],
    expiration: [''],
    security: [''],
  });

  isShippingFormSubmitted = new BehaviorSubject<boolean>(false);
  isPaymentFormSubmitted = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private analyticsService: AnalyticsService,
    private orderService: OrderService
  ) {}

  shippingFormComplete() {
    this.orderService.orders$
      .pipe(
        take(1),
        tap((orders: Order[]) => {
          this.isShippingFormSubmitted.next(true);
          this.analyticsService.trackEvent('add_shipping_info', orders);
        })
      )
      .subscribe();
  }

  paymentFormComplete() {
    this.orderService.orders$
      .pipe(
        take(1),
        tap((orders: Order[]) => {
          this.isPaymentFormSubmitted.next(true);
          this.analyticsService.trackEvent('add_payment_info', orders);
        })
      )
      .subscribe();
  }

  get isShippingFormSubmitted$() {
    return this.isShippingFormSubmitted.asObservable();
  }

  get isPaymentFormSubmitted$() {
    return this.isPaymentFormSubmitted.asObservable();
  }
}
