import { TestBed } from '@angular/core/testing';

import { UrlTrackerService } from './url-tracker.service';

describe('UrlTrackerService', () => {
  let service: UrlTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
