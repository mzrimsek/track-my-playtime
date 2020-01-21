import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import * as appActions from 'app/actions/app.actions';
import * as addPlayingActions from 'features/completion/actions/add-playing.actions';
import * as markCompleteActions from 'features/completion/actions/mark-complete.actions';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as progressActions from 'shared/actions/progress.actions';

import { ProgressService } from 'features/completion/services/progress.service';

@Injectable()
export class ProgressEffects {

  constructor(private actions$: Actions, private progressService: ProgressService) { }

  @Effect() loadProgressItems$ =
    this.actions$
      .ofType(progressActions.LOAD_PROGRESS_ITEMS)
      .pipe(
        map(action => action as progressActions.LoadProgressItems),
        switchMap(action => this.progressService.getProgressList(action.userId)
          .pipe(
            mergeMap(entities => [
              new progressActions.LoadProgressItemsSucceeded(entities),
              new markCompleteActions.LoadItems(entities.filter(entity => entity.endEntryId === '').map(entity => entity.id))
            ]),
            catchError(err => of(new appActions.Error(progressActions.LOAD_PROGRESS_ITEMS, err.message))))));

  @Effect() saveAddPlayingSucceeded$ =
    this.actions$
      .ofType(addPlayingActions.SAVE_SUCCEEDED)
      .pipe(
        map(action => action as addPlayingActions.SaveSucceeded),
        map(action => action.item),
        mergeMap(item => [
          new progressActions.AddNewProgressItem(item),
          new markCompleteActions.AddNewItem(item.id)
        ]));

  @Effect() markCompleted$ =
    this.actions$
      .ofType(progressActions.MARK_COMPLETE)
      .pipe(
        map(action => action as progressActions.MarkComplete),
        switchMap(action => this.progressService.markCompleted(action.userId, action.payload)
          .pipe(
            mergeMap(data => [
              new progressActions.MarkCompleteSucceeded(data),
              new markCompleteActions.Remove(data.itemId)
            ]),
            catchError(err => of(new appActions.Error(progressActions.MARK_COMPLETE, err.message))))));

  @Effect() removeProgressItem$ =
    this.actions$
      .ofType(progressActions.REMOVE_PROGRESS_ITEM)
      .pipe(
        map(action => action as progressActions.RemoveProgressItem),
        switchMap(action => this.progressService.remove(action.userId, action.itemId)
          .pipe(
            mergeMap(itemId => [
              new progressActions.RemoveProgressItemSucceeded(itemId),
              new markCompleteActions.Remove(itemId)
            ]),
            catchError(err => of(new appActions.Error(progressActions.REMOVE_PROGRESS_ITEM, err.message))))));

  @Effect() setNotes$ =
    this.actions$
      .ofType(progressActions.SET_NOTES)
      .pipe(
        map(action => action as progressActions.SetNotes),
        switchMap(action => this.progressService.setNotes(action.userId, action.payload)
          .pipe(
            mergeMap(data => [
              new progressActions.SetNotesSucceeded(data)
            ]),
            catchError(err => of(new appActions.Error(progressActions.SET_NOTES, err.message))))));
}
