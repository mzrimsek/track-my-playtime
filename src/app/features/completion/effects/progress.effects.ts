import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs';

import { ProgressService } from '../services/progress.service';

import * as appActions from '../../../actions/app.actions';
import * as progressActions from '../../../shared/actions/progress.actions';
import * as addPlayingActions from '../actions/add-playing.actions';
import * as markCompleteActions from '../actions/mark-complete.actions';

@Injectable()
export class ProgressEffects {

  constructor(private actions$: Actions, private progressService: ProgressService) { }

  @Effect() loadProgressItems$ =
    this.actions$
      .ofType(progressActions.LOAD_PROGRESS_ITEMS)
      .map(action => action as progressActions.LoadProgressItems)
      .switchMap(action => this.progressService.getProgressList(action.userId)
        .mergeMap(entities => [
          new progressActions.LoadProgressItemsSucceeded(entities),
          new markCompleteActions.LoadItems(entities.filter(entity => entity.endEntryId === '').map(entity => entity.id))
        ])
        .catch(err => Observable.of(new appActions.Error(progressActions.LOAD_PROGRESS_ITEMS, err.message))));

  @Effect() saveAddPlayingSucceeded$ =
    this.actions$
      .ofType(addPlayingActions.SAVE_SUCCEEDED)
      .map(action => action as addPlayingActions.SaveSucceeded)
      .map(action => action.item)
      .mergeMap(item => [
        new progressActions.AddNewProgressItem(item),
        new markCompleteActions.AddNewItem(item.id)
      ]);

  @Effect() markCompleted$ =
    this.actions$
      .ofType(progressActions.MARK_COMPLETE)
      .map(action => action as progressActions.MarkComplete)
      .switchMap(action => this.progressService.markCompleted(action.userId, action.payload)
        .mergeMap(data => [
          new progressActions.MarkCompleteSucceeded(data),
          new markCompleteActions.Remove(data.itemId)
        ])
        .catch(err => Observable.of(new appActions.Error(progressActions.MARK_COMPLETE, err.message))));

  @Effect() removeProgressItem$ =
    this.actions$
      .ofType(progressActions.REMOVE_PROGRESS_ITEM)
      .map(action => action as progressActions.RemoveProgressItem)
      .switchMap(action => this.progressService.remove(action.userId, action.itemId)
        .mergeMap(itemId => [
          new progressActions.RemoveProgressItemSucceeded(itemId),
          new markCompleteActions.Remove(itemId)
        ])
        .catch(err => Observable.of(new appActions.Error(progressActions.REMOVE_PROGRESS_ITEM, err.message))));
}
