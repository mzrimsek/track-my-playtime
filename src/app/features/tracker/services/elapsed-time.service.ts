import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ClockService } from './clock.service';

import trackerSelectors, { State as TrackerState } from '../reducers/root.reducer';

import { TimerInfo } from '../models';

import { formatElapsedTime } from '../../../shared/utils/date.utils';

@Injectable()
export class ElapsedTimeService {

  constructor(private trackerStore: Store<TrackerState>, private clockService: ClockService) { }

  getElapsedTime(inactiveValue: string): Observable<string> {
    const timerInfo$ = this.trackerStore.select(trackerSelectors.timerInfo);
    const currentTime$ = this.clockService.getCurrentTime();

    return currentTime$.combineLatest(timerInfo$, (currentTime: number, timerInfo: TimerInfo) => {
      return formatElapsedTime(timerInfo.startTime, currentTime, inactiveValue);
    });
  }
}
