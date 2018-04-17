import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import * as historyActions from '../../../features/tracker/actions/history.actions';
import * as platformsActions from '../../../features/tracker/actions/platforms.actions';
import * as userActions from '../../auth/actions/user.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions) { }

  @Effect() authenticated$ =
    this.actions$
      .ofType(userActions.AUTHENTICATED)
      .map(action => action as userActions.Authenticated)
      .mergeMap(action => [
        new platformsActions.LoadOptions(),
        new historyActions.LoadHistoryItems(action.user.uid)
      ]);

  @Effect() logout$ =
    this.actions$
      .ofType(userActions.LOGOUT)
      .mergeMap(() => [
        new historyActions.ClearHistoryItems()
      ]);
}
