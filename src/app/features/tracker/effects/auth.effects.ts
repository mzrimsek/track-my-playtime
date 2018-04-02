import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import * as userActions from '../../auth/actions/user.actions';
import * as historyActions from '../actions/history.actions';
import * as platformsActions from '../actions/platforms.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions) { }

  @Effect() authenticated$ =
    this.actions$
      .ofType(userActions.AUTHENTICATED)
      .map(action => action as userActions.Authenticated)
      .mergeMap(action => [
        new platformsActions.LoadOptions(),
        new historyActions.LoadHistoryItems(action.payload.uid)
      ]);

  @Effect() logout$ =
    this.actions$
      .ofType(userActions.LOGOUT)
      .mergeMap(() => [
        new historyActions.ClearHistoryItems()
      ]);
}
