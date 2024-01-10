import { TestBed } from '@angular/core/testing';

import { JavascriptInterfaceService } from './javascript-interface.service';

describe('JavascriptInterfaceService', () => {
  let service: JavascriptInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JavascriptInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
