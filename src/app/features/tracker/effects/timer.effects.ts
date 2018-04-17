import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { HistoryService } from '../services/history.service';

import * as appActions from '../../../actions/app.actions';
import * as timerActions from '../actions/timer.actions';

@Injectable()
export class TimerEffects {

  constructor(private actions$: Actions, private historyService: HistoryService) { }

  @Effect() saveTimerInfo$ =
    this.actions$
      .ofType(timerActions.SAVE_TIMER_INFO)
      .map(action => action as timerActions.SaveTimerInfo)
      .map(action => action.info)
      .switchMap(addTimerInfo => this.historyService.saveTimerInfo(addTimerInfo)
        .mergeMap(item => [
          new timerActions.SaveTimerInfoSucceeded(item),
          new timerActions.ResetTimer()
        ])
        .catch(err =>
          Observable.of(new appActions.Error(timerActions.SAVE_TIMER_INFO, err.message))
        )
      );

  @Effect() cancelTimer$ =
    this.actions$
      .ofType(timerActions.CANCEL_TIMER)
      .mergeMap(() => [
        new timerActions.ResetTimer()
      ]);
}
