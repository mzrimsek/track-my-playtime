import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ClockService } from './clock.service';

import trackerSelectors, { State as TrackerState } from '../reducers/root.reducer';

import { TimerInfo } from '../models';

import { formatTime, getElapsedTimeInSeconds } from '../../../shared/utils/date.utils';

@Injectable()
export class ElapsedTimeService {

  timerInfo$: Observable<TimerInfo>;
  currentTime$: Observable<number>;
  constructor(private trackerStore: Store<TrackerState>, private clockService: ClockService) {
    this.timerInfo$ = this.trackerStore.select(trackerSelectors.timerInfo);
    this.currentTime$ = this.clockService.getCurrentTime();
  }

  getElapsedTime(inactiveValue: string): Observable<string> {
    return this.currentTime$.combineLatest(this.timerInfo$, (currentTime: number, timerInfo: TimerInfo) => {
      const elapsedTime = getElapsedTimeInSeconds(timerInfo.startTime, currentTime);
      return elapsedTime >= 0 && this.canCalculate(timerInfo.startTime, currentTime) ? formatTime(elapsedTime) : inactiveValue;
    });
  }

  private canCalculate(startTime: number, endTime: number): boolean {
    const areValid = startTime !== 0 && endTime !== 0;
    const areInOrder = startTime <= endTime;
    return areValid && areInOrder;
  }
}
