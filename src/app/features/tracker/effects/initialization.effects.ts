import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import * as appActions from '../../../actions/app.actions';
import * as userActions from '../../auth/actions/user.actions';
import * as historyActions from '../actions/history.actions';
import * as platformsActions from '../actions/platforms.actions';

@Injectable()
export class TrackerInitializationEffects {

  constructor(private actions$: Actions) { }

  @Effect() initialize$ =
    this.actions$
      .ofType(appActions.APP_INIT)
      .mergeMap(() => [
        new platformsActions.LoadOptions(),
      ]);

  @Effect() authenticated$ =
    this.actions$
      .ofType(userActions.AUTHENTICATED)
      .mergeMap(() => [
        new historyActions.LoadHistoryItems()
      ]);
}
