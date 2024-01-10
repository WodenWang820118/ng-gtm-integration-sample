import { Component } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { SharedModule } from 'src/app/shared.module';
import { FormBuilder } from '@angular/forms';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { ShippingFormComponent } from '../../components/shipping-form/shipping-form.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [SharedModule, ShippingFormComponent, PaymentFormComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  orders$ = this.orderService.orders$;

  constructor(private orderService: OrderService, private fb: FormBuilder) {}

  calculateTotalPrice() {
    return this.orderService.calculateTotalPrice();
  }
}
