import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { combineLatest, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import sharedSelectors, { SharedState } from '../../../shared/reducers/root.reducer';

import { TimerInfo } from '../../../shared/models';

import { formatElapsedTime } from '../../../shared/utils/date.utils';

@Injectable()
export class ElapsedTimeService {

  currentTime$: Observable<number>;
  constructor(private sharedStore: Store<SharedState>) { }

  getCurrentTime(): Observable<number> {
    if (!this.currentTime$) {
      this.currentTime$ = interval(1000).pipe(map(() => new Date().getTime()));
    }
    return this.currentTime$;
  }

  getElapsedTime(inactiveValue: string): Observable<string> {
    const timerInfo$ = this.sharedStore.select(sharedSelectors.timerInfo);
    const currentTime$ = this.getCurrentTime();

    return combineLatest(currentTime$, timerInfo$, (currentTime: number, timerInfo: TimerInfo) => {
      return formatElapsedTime(timerInfo.startTime, currentTime, inactiveValue);
    });
  }
}
