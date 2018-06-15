import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs';

import { ProgressService } from '../services/progress.service';

import * as appActions from '../../../actions/app.actions';
import * as addPlayingActions from '../actions/add-playing.actions';
import * as progressActions from '../actions/progress.actions';

@Injectable()
export class ProgressEffects {

  constructor(private actions$: Actions, private progressService: ProgressService) { }

  @Effect() loadProgressItems$ =
    this.actions$
      .ofType(progressActions.LOAD_PROGRESS_ITEMS)
      .map(action => action as progressActions.LoadProgressItems)
      .switchMap(action => this.progressService.getProgressList(action.userId)
        .map(data => new progressActions.LoadProgressItemsSucceeded(data))
        .catch(err => Observable.of(new appActions.Error(progressActions.LOAD_PROGRESS_ITEMS, err.message))));

  @Effect() saveAddPlayingSucceeded$ =
    this.actions$
      .ofType(addPlayingActions.SAVE_SUCCEEDED)
      .map(action => action as addPlayingActions.SaveSucceeded)
      .map(action => new progressActions.AddNewProgressItem(action.item));

  // this needs tested
  @Effect() markCompleted$ =
    this.actions$
      .ofType(progressActions.MARK_COMPLETE)
      .map(action => action as progressActions.MarkComplete)
      .switchMap(action => this.progressService.markCompleted(action.userId, action.payload)
        .map(data => new progressActions.MarkCompleteSucceeded(data))
        .catch(err => Observable.of(new appActions.Error(progressActions.MARK_COMPLETE, err.message))));
}
