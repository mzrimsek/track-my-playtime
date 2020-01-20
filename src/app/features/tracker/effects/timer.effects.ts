import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import * as appActions from 'app/actions/app.actions';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as timerActions from 'shared/actions/timer.actions';

import { HistoryService } from 'features/tracker/services/history.service';
import { TimerService } from 'features/tracker/services/timer.service';

@Injectable()
export class TimerEffects {

  constructor(private actions$: Actions, private historyService: HistoryService, private timerService: TimerService) { }

  @Effect() saveTimerInfo$ =
    this.actions$
      .ofType(timerActions.SAVE_TIMER_INFO)
      .pipe(
        map(action => action as timerActions.SaveTimerInfo),
        map(action => action.info),
        switchMap(addTimerInfo => this.historyService.saveTimerInfo(addTimerInfo)
          .pipe(
            mergeMap(item => [
              new timerActions.SaveTimerInfoSucceeded(item),
              new timerActions.ResetTimer()
            ]),
            catchError(err => of(new appActions.Error(timerActions.SAVE_TIMER_INFO, err.message))))));

  @Effect() cancelTimer$ =
    this.actions$
      .ofType(timerActions.CANCEL_TIMER)
      .pipe(map(() => new timerActions.ResetTimer()));

  @Effect() loadTimerInfo$ =
    this.actions$
      .ofType(timerActions.LOAD_TIMER_INFO)
      .pipe(
        map(action => action as timerActions.LoadTimerInfo),
        map(action => action.userId),
        switchMap(userId => this.timerService.getTimerInfo(userId)
          .pipe(
            map(data => new timerActions.SetTimerInfo(data)),
            catchError(err => of(new appActions.Error(timerActions.LOAD_TIMER_INFO, err.message))))));
}
