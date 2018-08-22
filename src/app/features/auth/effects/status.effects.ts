import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import * as fromRouter from '@ngrx/router-store';

import * as appActions from '../../../actions/app.actions';
import * as statusActions from '../actions/status.actions';
import * as userActions from '../actions/user.actions';

import { Error } from '../../../models';

import { getValidationMessage } from '../utils/validation.utils';

@Injectable()
export class StatusEffects {

  constructor(private actions$: Actions) { }

  @Effect() error$ =
    this.actions$
      .ofType(appActions.APP_ERROR)
      .map(action => action as appActions.Error)
      .mergeMap(action => {
        const validationMessage = getValidationMessage(action as Error);
        return [
          new statusActions.SetAttemptingLogin(false),
          new statusActions.SetValidationMessage(validationMessage)
        ];
      });

  @Effect() routeNavigate$ =
    this.actions$
      .ofType(fromRouter.ROUTER_NAVIGATION)
      .mergeMap(() => [
        new statusActions.SetValidationMessage('')
      ]);

  @Effect() login$ =
    this.actions$
      .ofType(userActions.EMAIL_LOGIN,
        userActions.SIGNUP,
        userActions.GOOGLE_LOGIN,
        userActions.FACEBOOK_LOGIN)
      .mergeMap(() => [
        new statusActions.SetAttemptingLogin(true)
      ]);

  @Effect() postLogin$ =
    this.actions$
      .ofType(userActions.AUTHENTICATED, userActions.NOT_AUTHENTICATED)
      .mergeMap(() => [
        new statusActions.SetAttemptingLogin(false)
      ]);
}
