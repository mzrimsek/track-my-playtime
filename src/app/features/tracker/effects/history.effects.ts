import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as timerActions from '../actions/timer';
import * as historyActions from '../actions/history';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class HistoryEffects {

  constructor(private actions$: Actions) { }

  @Effect() saveTimerInfoSucceeded$ =
    this.actions$
      .ofType(timerActions.SAVE_TIMER_INFO_SUCCEEDED)
      .map(action => action as timerActions.SaveTimerInfoSucceeded)
      .mergeMap(action => [
        new historyActions.AddNewHistoryItem(action.item)
      ]);
}
