import { TestBed } from '@angular/core/testing';

import { ElapsedTimeService } from './elapsed-time.service';

describe('ElapsedTimeService', () => {
  let service: ElapsedTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElapsedTimeService]
    });

    service = TestBed.get(ElapsedTimeService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });
});
