import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as appActions from '../../../actions';
import * as timerActions from '../actions/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TrackerInitializationEffects {

  constructor(private actions$: Actions) { }

  @Effect() initialize$ =
    this.actions$
      .ofType(appActions.APP_INIT)
      .mergeMap(action => [
        new timerActions.LoadPlatforms()
      ]);

  @Effect() loadPlatforms$ =
    this.actions$.ofType(timerActions.LOAD_PLATFORMS)
      .map(() => {
        return new timerActions.LoadPlatformsSucceeded([
          'PS3',
          'PS4',
          'Xbox 360',
          'Xbox One',
          '3DS',
          'Switch',
          'PC - Steam',
          'PC - GoG',
          'PC - Battle.net',
          'PC - Origin',
          'PC - Uplay',
          'PC - Other',
          'Mobile'
        ]);
      });
}
