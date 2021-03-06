import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { ProgressService } from '../services/progress.service';

import * as appActions from '../../../actions/app.actions';
import * as addPlayingActions from '../actions/add-playing.actions';

@Injectable()
export class AddPlayingEffects {

  constructor(private actions$: Actions, private progressService: ProgressService) { }

  @Effect() save$ =
    this.actions$
      .ofType(addPlayingActions.SAVE)
      .pipe(
        map(action => action as addPlayingActions.Save),
        map(action => action.addPlaying),
        switchMap(addPlaying => this.progressService.saveAddPlaying(addPlaying)
          .pipe(
            mergeMap(newItem => [
              new addPlayingActions.SaveSucceeded(newItem),
              new addPlayingActions.Reset()
            ]),
            catchError(err => of(new appActions.Error(addPlayingActions.SAVE, err.message))))));
}
