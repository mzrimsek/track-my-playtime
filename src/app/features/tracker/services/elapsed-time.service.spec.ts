import { TestBed, inject } from '@angular/core/testing';

import { ElapsedTimeService } from './elapsed-time.service';

describe('ElapsedTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElapsedTimeService]
    });
  });

  it('should be created', inject([ElapsedTimeService], (service: ElapsedTimeService) => {
    expect(service).toBeTruthy();
  }));
});
