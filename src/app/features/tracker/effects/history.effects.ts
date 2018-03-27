import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { HistoryService } from '../services/history.service';

import * as appActions from '../../../actions/app.actions';
import * as userActions from '../../auth/actions/user.actions';
import * as timerActions from '../actions/timer.actions';
import * as historyActions from '../actions/history.actions';

@Injectable()
export class HistoryEffects {

  constructor(private actions$: Actions, private historyService: HistoryService) { }

  @Effect() loadHistoryItems$ =
    this.actions$
      .ofType(historyActions.LOAD_HISTORY_ITEMS)
      .switchMap(() => this.historyService.getHistoryList()
        .map(data => {
          return new historyActions.LoadHistoryItemsSucceeded(data);
        })
        .catch(err =>
          Observable.of(new appActions.Error(historyActions.LOAD_HISTORY_ITEMS, err.message))
        )
      );

  @Effect() saveTimerInfoSucceeded$ =
    this.actions$
      .ofType(timerActions.SAVE_TIMER_INFO_SUCCEEDED)
      .map(action => action as timerActions.SaveTimerInfoSucceeded)
      .mergeMap(action => [
        new historyActions.AddNewHistoryItem(action.item)
      ]);

  @Effect() removeHistoryItem$ =
    this.actions$
      .ofType(historyActions.REMOVE_HISTORY_ITEM)
      .map(action => action as historyActions.RemoveHistoryItem)
      .map(action => action.id)
      .switchMap(itemId => this.historyService.deleteHistoryItem(itemId)
        .map(removedId => {
          return new historyActions.RemoveHistoryItemSucceeded(removedId);
        })
        .catch(err =>
          Observable.of(new appActions.Error(historyActions.REMOVE_HISTORY_ITEM, err.message))
        )
      );

  @Effect() logout$ =
    this.actions$
      .ofType(userActions.LOGOUT)
      .mergeMap(() => [
        new historyActions.ClearHistoryItems()
      ]);
}
