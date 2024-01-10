import { TestBed } from '@angular/core/testing';

import { EnvDetectorService } from './env-detector.service';

describe('EnvDetectorService', () => {
  let service: EnvDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
