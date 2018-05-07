import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { HistoryService } from '../services/history.service';

import * as appActions from '../../../actions/app.actions';
import * as historyActions from '../actions/history.actions';
import * as timerActions from '../actions/timer.actions';

@Injectable()
export class HistoryEffects {

  constructor(private actions$: Actions, private historyService: HistoryService) { }

  @Effect() loadHistoryItems$ =
    this.actions$
      .ofType(historyActions.LOAD_HISTORY_ITEMS)
      .map(action => action as historyActions.LoadHistoryItems)
      .switchMap(action => this.historyService.getHistoryList(action.userId)
        .map(data => new historyActions.LoadHistoryItemsSucceeded(data))
        .catch(err => Observable.of(new appActions.Error(historyActions.LOAD_HISTORY_ITEMS, err.message)))
      );

  @Effect() saveTimerInfoSucceeded$ =
    this.actions$
      .ofType(timerActions.SAVE_TIMER_INFO_SUCCEEDED)
      .map(action => action as timerActions.SaveTimerInfoSucceeded)
      .map(action => new historyActions.AddNewHistoryItem(action.item));

  @Effect() removeHistoryItem$ =
    this.actions$
      .ofType(historyActions.REMOVE_HISTORY_ITEM)
      .map(action => action as historyActions.RemoveHistoryItem)
      .switchMap(action => this.historyService.deleteHistoryItem(action.userId, action.itemId)
        .map(itemId => new historyActions.RemoveHistoryItemSucceeded(itemId))
        .catch(err => Observable.of(new appActions.Error(historyActions.REMOVE_HISTORY_ITEM, err.message)))
      );

  @Effect() updateGame$ =
    this.actions$
      .ofType(historyActions.UPDATE_GAME)
      .map(action => action as historyActions.UpdateGame)
      .switchMap(action => this.historyService.updateGame(action.userId, action.payload)
        .map(payload => new historyActions.UpdateGameSucceeded(payload))
        .catch(err => Observable.of(new appActions.Error(historyActions.UPDATE_GAME, err.message)))
      );

  @Effect() updatePlatform$ =
    this.actions$
      .ofType(historyActions.UPDATE_PLATFORM)
      .map(action => action as historyActions.UpdatePlatform)
      .switchMap(action => this.historyService.updatePlatform(action.userId, action.payload)
        .map(payload => new historyActions.UpdatePlatformSucceeded(payload))
        .catch(err => Observable.of(new appActions.Error(historyActions.UPDATE_PLATFORM, err.message)))
      );

  @Effect() updateElapsedTime$ =
    this.actions$
      .ofType(historyActions.UPDATE_ELAPSED_TIME)
      .map(action => action as historyActions.UpdateElapsedTime)
      .switchMap(action => this.historyService.updateElapsedTime(action.userId, action.payload)
        .map(payload => new historyActions.UpdateElapsedTimeSucceeded(payload))
        .catch(err => Observable.of(new appActions.Error(historyActions.UPDATE_ELAPSED_TIME, err.message)))
      );
}
