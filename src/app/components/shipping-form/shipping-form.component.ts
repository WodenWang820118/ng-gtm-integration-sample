import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from '../../../app/shared.module';
import { CheckoutFormManagerService } from '../../services/checkout-form-manager/checkout-form-manager.service';

@Component({
  selector: 'app-shipping-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit {
  shippingForm!: FormGroup;

  constructor(public checkoutFormManager: CheckoutFormManagerService) {}

  ngOnInit(): void {
    this.shippingForm = this.checkoutFormManager.shippingForm;
  }

  continue() {
    if (this.shippingForm.valid) {
      console.log('shipping form is valid');
      this.checkoutFormManager.shippingFormComplete();
    }
  }
}
