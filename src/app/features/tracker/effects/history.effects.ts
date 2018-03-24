import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HistoryService } from '../services/history.service';
import * as userActions from '../../auth/actions/user.actions';
import * as timerActions from '../actions/timer.actions';
import * as historyActions from '../actions/history.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class HistoryEffects {

  constructor(private actions$: Actions, private historyService: HistoryService) { }

  @Effect() loadHistoryItems$ =
    this.actions$
      .ofType(historyActions.LOAD_HISTORY_ITEMS)
      .switchMap(() => this.historyService.getHistoryList()
        .map(data => {
          return new historyActions.LoadHistoryItemsSucceeded(data);
        }));

  @Effect() saveTimerInfoSucceeded$ =
    this.actions$
      .ofType(timerActions.SAVE_TIMER_INFO_SUCCEEDED)
      .map(action => action as timerActions.SaveTimerInfoSucceeded)
      .mergeMap(action => [
        new historyActions.AddNewHistoryItem(action.item)
      ]);

  @Effect() logout$ =
    this.actions$
      .ofType(userActions.LOGOUT)
      .mergeMap(() => [
        new historyActions.ClearHistoryItems()
      ]);
}
