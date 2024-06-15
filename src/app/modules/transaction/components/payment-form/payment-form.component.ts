import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutFormManagerService } from '../../../../shared/services/checkout-form-manager/checkout-form-manager.service';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe, NgClass],
  template: `
    <div
      id="paymentMethod"
      class="container p-0"
      [ngClass]="
        (checkoutFormManager.isShippingFormSubmitted$ | async)
          ? 'visible'
          : 'hidden'
      "
    >
      <form [formGroup]="paymentForm">
        <div class="row mb-3">
          <label for="cardNum" class="col-sm-2 col-form-label"
            >Card Number</label
          >
          <div class="col-sm-10">
            <input
              formControlName="cardNum"
              type="text"
              class="form-control"
              id="cardNum"
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="expiration" class="col-sm-2 col-form-label"
            >Expiration</label
          >
          <div class="col-sm-10">
            <input
              formControlName="expiration"
              type="text"
              class="form-control"
              id="expiration"
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="security" class="col-sm-2 col-form-label"
            >Security Code</label
          >
          <div class="col-sm-10">
            <input
              formControlName="security"
              type="text"
              class="form-control"
              id="security"
            />
          </div>
        </div>
        <a (click)="navigateToThankYou()">
          <button class="btn btn-primary" (click)="trackAddPaymentInfo()">
            Place Order
          </button>
        </a>
      </form>
    </div>
  `,
  styles: [
    `
      #paymentMethod label {
        width: 100%;
        color: steelblue;
        text-transform: lowercase;
        font-variant: small-caps;
        font-size: 16px;
      }
    `,
  ],
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  constructor(
    public checkoutFormManager: CheckoutFormManagerService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.checkoutFormManager.paymentForm;
  }

  navigateToThankYou() {
    this.navigationService.navigateToThankYou();
  }

  trackAddPaymentInfo() {
    this.checkoutFormManager.paymentFormComplete();
  }
}
