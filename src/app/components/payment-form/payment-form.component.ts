import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutFormManagerService } from '../../services/checkout-form-manager/checkout-form-manager.service';
import { SharedModule } from '../../shared.module';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
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
