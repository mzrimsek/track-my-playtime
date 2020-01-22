import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import * as appActions from 'app/actions/app.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as historyActions from 'shared/actions/history.actions';
import * as timerActions from 'shared/actions/timer.actions';

import { HistoryService } from 'features/tracker/services/history.service';

@Injectable()
export class HistoryEffects {

  constructor(private actions$: Actions, private historyService: HistoryService) { }

  @Effect() loadHistoryItems$ =
    this.actions$
      .pipe(
        ofType(historyActions.LOAD_HISTORY_ITEMS),
        map(action => action as historyActions.LoadHistoryItems),
        switchMap(action => this.historyService.getHistoryList(action.userId)
          .pipe(
            map(data => new historyActions.LoadHistoryItemsSucceeded(data)),
            catchError(err => of(new appActions.Error(historyActions.LOAD_HISTORY_ITEMS, err.message))))));

  @Effect() saveTimerInfoSucceeded$ =
    this.actions$
      .pipe(
        ofType(timerActions.SAVE_TIMER_INFO_SUCCEEDED),
        map(action => action as timerActions.SaveTimerInfoSucceeded),
        map(action => new historyActions.AddNewHistoryItem(action.item)));

  @Effect() removeHistoryItem$ =
    this.actions$
      .pipe(
        ofType(historyActions.REMOVE_HISTORY_ITEM),
        map(action => action as historyActions.RemoveHistoryItem),
        switchMap(action => this.historyService.deleteHistoryItem(action.userId, action.itemId)
          .pipe(
            map(itemId => new historyActions.RemoveHistoryItemSucceeded(itemId)),
            catchError(err => of(new appActions.Error(historyActions.REMOVE_HISTORY_ITEM, err.message))))));

  @Effect() updateGame$ =
    this.actions$
      .pipe(
        ofType(historyActions.UPDATE_GAME),
        map(action => action as historyActions.UpdateGame),
        switchMap(action => this.historyService.updateGame(action.userId, action.payload)
          .pipe(
            map(payload => new historyActions.UpdateGameSucceeded(payload)),
            catchError(err => of(new appActions.Error(historyActions.UPDATE_GAME, err.message))))));

  @Effect() updatePlatform$ =
    this.actions$
      .pipe(
        ofType(historyActions.UPDATE_PLATFORM),
        map(action => action as historyActions.UpdatePlatform),
        switchMap(action => this.historyService.updatePlatform(action.userId, action.payload)
          .pipe(
            map(payload => new historyActions.UpdatePlatformSucceeded(payload)),
            catchError(err => of(new appActions.Error(historyActions.UPDATE_PLATFORM, err.message))))));

  @Effect() updateElapsedTime$ =
    this.actions$
      .pipe(
        ofType(historyActions.UPDATE_ELAPSED_TIME),
        map(action => action as historyActions.UpdateElapsedTime),
        switchMap(action => this.historyService.updateElapsedTime(action.userId, action.payload)
          .pipe(
            map(payload => new historyActions.UpdateElapsedTimeSucceeded(payload)),
            catchError(err => of(new appActions.Error(historyActions.UPDATE_ELAPSED_TIME, err.message))))));
}
