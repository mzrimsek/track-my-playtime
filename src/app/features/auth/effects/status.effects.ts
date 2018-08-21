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

  @Effect() emailLogin$ =
    this.actions$
      .ofType(userActions.EMAIL_LOGIN)
      .mergeMap(() => [
        new statusActions.SetAttemptingLogin(true)
      ]);

  @Effect() signUp$ =
    this.actions$
      .ofType(userActions.SIGNUP)
      .mergeMap(() => [
        new statusActions.SetAttemptingLogin(true)
      ]);

  @Effect() googleLogin$ =
    this.actions$
      .ofType(userActions.GOOGLE_LOGIN)
      .mergeMap(() => [
        new statusActions.SetAttemptingLogin(true)
      ]);

  @Effect() facebookLogin$ =
    this.actions$
      .ofType(userActions.FACEBOOK_LOGIN)
      .mergeMap(() => [
        new statusActions.SetAttemptingLogin(true)
      ]);

  @Effect() authenticated$ =
    this.actions$
      .ofType(userActions.AUTHENTICATED)
      .mergeMap(() => [
        new statusActions.SetAttemptingLogin(false)
      ]);

  @Effect() notAuthenticated$ =
    this.actions$
      .ofType(userActions.NOT_AUTHENTICATED)
      .mergeMap(() => [
        new statusActions.SetAttemptingLogin(false)
      ]);
}
