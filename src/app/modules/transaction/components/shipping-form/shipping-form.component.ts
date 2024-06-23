import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutFormManagerService } from '../../../../shared/services/checkout-form-manager/checkout-form-manager.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-shipping-form',
  standalone: true,
  imports: [AsyncPipe, NgClass, ReactiveFormsModule, FormsModule],
  template: `
    <div class="container p-0" id="shippingForm">
      <form [formGroup]="shippingForm" (ngSubmit)="continue()">
        <div class="mb-3 row">
          <label for="name" class="col-sm-2 col-form-label">Name:</label>
          <div class="col-sm-10">
            <input
              formControlName="name"
              type="text"
              class="form-control"
              id="name"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="address" class="col-sm-2 col-form-label">Address:</label>
          <div class="col-sm-10">
            <input
              formControlName="address"
              type="text"
              class="form-control"
              id="address"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="zip" class="col-sm-2 col-form-label">Zip Code:</label>
          <div class="col-sm-10">
            <input
              formControlName="zip"
              type="text"
              class="form-control"
              id="zip"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="city" class="col-sm-2 col-form-label">City:</label>
          <div class="col-sm-10">
            <input
              formControlName="city"
              type="text"
              class="form-control"
              id="city"
            />
          </div>
        </div>
        <div
          id="confirmReservation"
          [ngClass]="
            (checkoutFormManager.isShippingFormSubmitted | async)
              ? 'hidden'
              : 'visible'
          "
        >
          <button class="btn btn-primary">Continue</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      #confirmReservation {
        margin: 10px 0;
      }

      #confirmReservation a {
        font-size: 20px;
        padding: 10px;
      }

      #shippingForm label {
        width: 100%;
        color: steelblue;
        text-transform: lowercase;
        font-variant: small-caps;
        font-size: 16px;
      }

      #shippingForm input,
      #shippingForm textarea {
        width: 100%;
      }
    `,
  ],
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
