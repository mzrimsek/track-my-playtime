import { TestBed } from '@angular/core/testing';

import { ClockService } from './clock.service';

describe('Clock Service', () => {
  let service: ClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClockService]
    });

    service = TestBed.get(ClockService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentTime', () => {
    it('Should return the current time', () => {
      const result = service.getCurrentTime();
      result.subscribe(res => {
        // Only care that it is precise down to the second, not millisecond
        const resTimeInSeconds = Math.floor(res / 1000);
        const nowTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        expect(resTimeInSeconds).toBe(nowTimeInSeconds);
      });
    });
  });
});
