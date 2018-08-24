import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import trackerSelectors, { State as TrackerState } from '../reducers/root.reducer';

import { TimerInfo } from '../models';

import { formatElapsedTime } from '../../../shared/utils/date.utils';

@Injectable()
export class ElapsedTimeService {

  constructor(private trackerStore: Store<TrackerState>) { }

  getCurrentTime(): Observable<number> {
    return Observable.interval(1000).map(() => new Date().getTime());
  }

  getElapsedTime(inactiveValue: string): Observable<string> {
    const timerInfo$ = this.trackerStore.select(trackerSelectors.timerInfo);
    const currentTime$ = this.getCurrentTime();

    return currentTime$.combineLatest(timerInfo$, (currentTime: number, timerInfo: TimerInfo) => {
      return formatElapsedTime(timerInfo.startTime, currentTime, inactiveValue);
    });
  }
}
