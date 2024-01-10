import { TestBed } from '@angular/core/testing';

import { CheckoutFormManagerService } from './checkout-form-manager.service';

describe('CheckoutFormManagerService', () => {
  let service: CheckoutFormManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutFormManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
