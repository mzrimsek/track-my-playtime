import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { UserService } from '../../auth/services/user.service';
import { HistoryService } from '../services/history.service';

import * as appActions from '../../../actions/app.actions';
import * as userActions from '../../auth/actions/user.actions';
import * as historyActions from '../actions/history.actions';
import * as timerActions from '../actions/timer.actions';

@Injectable()
export class HistoryEffects {

  constructor(private actions$: Actions, private historyService: HistoryService, private userService: UserService) { }

  @Effect() loadHistoryItems$ =
    this.actions$
      .ofType(historyActions.LOAD_HISTORY_ITEMS)
      .switchMap(() => this.userService.getUser())
      .switchMap(user => this.historyService.getHistoryList(user.uid)
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
      .switchMap(itemId => this.userService.getUser()
        .map(user => <Delete>{
          userId: user.uid,
          itemId
        })
      )
      .switchMap(data => this.historyService.deleteHistoryItem(data.userId, data.itemId)
        .map(removedId =>
          new historyActions.RemoveHistoryItemSucceeded(removedId)
        )
        .catch(err =>
          Observable.of(new appActions.Error(historyActions.REMOVE_HISTORY_ITEM, err.message))
        )
      );

  @Effect() updateGame$ =
    this.actions$
      .ofType(historyActions.UPDATE_GAME)
      .map(action => action as historyActions.UpdateGame)
      .map(action => <UpdateActionData>{
        itemId: action.id,
        prop: action.game
      })
      .switchMap(actionData => this.userService.getUser()
        .map(user => <UpdateData>{
          userId: user.uid,
          ...actionData
        })
      )
      .switchMap(updateData => this.historyService.updateGame(updateData.userId, updateData.itemId, updateData.prop)
        .map(updateProp =>
          new historyActions.UpdateGameSucceeded(updateProp.itemId, updateProp.prop)
        )
        .catch(err =>
          Observable.of(new appActions.Error(historyActions.UPDATE_GAME, err.message))
        )
      );

  @Effect() updatePlatform$ =
    this.actions$
      .ofType(historyActions.UPDATE_PLATFORM)
      .map(action => action as historyActions.UpdatePlatform)
      .map(action => <UpdateActionData>{
        itemId: action.id,
        prop: action.platform
      })
      .switchMap(actionData => this.userService.getUser()
        .map(user => <UpdateData>{
          userId: user.uid,
          ...actionData
        })
      )
      .switchMap(updateData => this.historyService.updatePlatform(updateData.userId, updateData.itemId, updateData.prop)
        .map(updateProp =>
          new historyActions.UpdatePlatformSucceeded(updateProp.itemId, updateProp.prop)
        )
        .catch(err =>
          Observable.of(new appActions.Error(historyActions.UPDATE_PLATFORM, err.message))
        )
      );

  @Effect() updateElapsedTime$ =
    this.actions$
      .ofType(historyActions.UPDATE_ELAPSED_TIME)
      .map(action => action as historyActions.UpdateElapsedTime)
      .map(action => <MultiUpdateActionData>{
        itemId: action.id,
        props: {
          startTime: action.startTime,
          endTime: action.endTime
        }
      })
      .switchMap(actionData => this.userService.getUser()
        .map(user => <MultiUpdateData>{
          userId: user.uid,
          ...actionData
        })
      )
      .switchMap(updateData =>
        this.historyService.updateElapsedTime(updateData.userId, updateData.itemId, updateData.props.startTime, updateData.props.endTime)
          .map(updateProps =>
            new historyActions.UpdateElapsedTimeSucceeded(updateProps.itemId, updateProps.props.startTime, updateProps.props.endTime)
          )
          .catch(err =>
            Observable.of(new appActions.Error(historyActions.UPDATE_ELAPSED_TIME, err.message))
          )
      );

  @Effect() logout$ =
    this.actions$
      .ofType(userActions.LOGOUT)
      .mergeMap(() => [
        new historyActions.ClearHistoryItems()
      ]);
}

interface Delete {
  userId: string;
  itemId: string;
}

interface UpdateActionData {
  itemId: string;
  prop: string;
}

interface UpdateData extends UpdateActionData {
  userId: string;
}

interface MultiUpdateActionData {
  itemId: string;
  props: {
    [key: string]: number;
  };
}

interface MultiUpdateData extends MultiUpdateActionData {
  userId: string;
}
