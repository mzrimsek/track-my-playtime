import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { ProgressService } from '../services/progress.service';

import * as appActions from '../../../actions/app.actions';
import * as addPlayingActions from '../actions/add-playing.actions';

@Injectable()
export class AddPlayingEffects {

  constructor(private actions$: Actions, private progressService: ProgressService) { }

  @Effect() save$ =
    this.actions$
      .ofType(addPlayingActions.SAVE)
      .map(action => action as addPlayingActions.Save)
      .map(action => action.addPlaying)
      .switchMap(addPlaying => this.progressService.saveAddPlaying(addPlaying)
        .mergeMap(newItem => [
          new addPlayingActions.SaveSucceeded(newItem),
          new addPlayingActions.Reset()
        ])
        .catch(err => Observable.of(new appActions.Error(addPlayingActions.SAVE, err.message))));
}
