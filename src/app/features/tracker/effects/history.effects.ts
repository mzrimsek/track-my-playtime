import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { HistoryService } from '../services/history.service';

import * as appActions from '../../../actions/app.actions';
import * as historyActions from '../../../shared/actions/history.actions';
import * as timerActions from '../../../shared/actions/timer.actions';

@Injectable()
export class HistoryEffects {

  constructor(private actions$: Actions, private historyService: HistoryService) { }

  @Effect() loadHistoryItems$ =
    this.actions$
      .ofType(historyActions.LOAD_HISTORY_ITEMS)
      .pipe(
        map(action => action as historyActions.LoadHistoryItems),
        switchMap(action => this.historyService.getHistoryList(action.userId)
          .pipe(
            map(data => new historyActions.LoadHistoryItemsSucceeded(data)),
            catchError(err => of(new appActions.Error(historyActions.LOAD_HISTORY_ITEMS, err.message))))));

  @Effect() saveTimerInfoSucceeded$ =
    this.actions$
      .ofType(timerActions.SAVE_TIMER_INFO_SUCCEEDED)
      .pipe(
        map(action => action as timerActions.SaveTimerInfoSucceeded),
        map(action => new historyActions.AddNewHistoryItem(action.item)));

  @Effect() removeHistoryItem$ =
    this.actions$
      .ofType(historyActions.REMOVE_HISTORY_ITEM)
      .pipe(
        map(action => action as historyActions.RemoveHistoryItem),
        switchMap(action => this.historyService.deleteHistoryItem(action.userId, action.itemId)
          .pipe(
            map(itemId => new historyActions.RemoveHistoryItemSucceeded(itemId)),
            catchError(err => of(new appActions.Error(historyActions.REMOVE_HISTORY_ITEM, err.message))))));

  @Effect() updateGame$ =
    this.actions$
      .ofType(historyActions.UPDATE_GAME)
      .pipe(
        map(action => action as historyActions.UpdateGame),
        switchMap(action => this.historyService.updateGame(action.userId, action.payload)
          .pipe(
            map(payload => new historyActions.UpdateGameSucceeded(payload)),
            catchError(err => of(new appActions.Error(historyActions.UPDATE_GAME, err.message))))));

  @Effect() updatePlatform$ =
    this.actions$
      .ofType(historyActions.UPDATE_PLATFORM)
      .pipe(
        map(action => action as historyActions.UpdatePlatform),
        switchMap(action => this.historyService.updatePlatform(action.userId, action.payload)
          .pipe(
            map(payload => new historyActions.UpdatePlatformSucceeded(payload)),
            catchError(err => of(new appActions.Error(historyActions.UPDATE_PLATFORM, err.message))))));

  @Effect() updateElapsedTime$ =
    this.actions$
      .ofType(historyActions.UPDATE_ELAPSED_TIME)
      .pipe(
        map(action => action as historyActions.UpdateElapsedTime),
        switchMap(action => this.historyService.updateElapsedTime(action.userId, action.payload)
          .pipe(
            map(payload => new historyActions.UpdateElapsedTimeSucceeded(payload)),
            catchError(err => of(new appActions.Error(historyActions.UPDATE_ELAPSED_TIME, err.message))))));
}
