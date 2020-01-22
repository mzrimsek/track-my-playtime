import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromRouter from '@ngrx/router-store';

import * as appActions from 'app/actions/app.actions';
import * as statusActions from 'features/auth/actions/status.actions';
import * as userActions from 'features/auth/actions/user.actions';
import { map, mergeMap } from 'rxjs/operators';

import { Error } from 'app/models';

import { getValidationMessage } from 'features/auth/utils/validation.utils';

@Injectable()
export class StatusEffects {

  constructor(private actions$: Actions) { }

  @Effect() error$ =
    this.actions$
      .pipe(
        ofType(appActions.APP_ERROR),
        map(action => action as appActions.Error),
        mergeMap(action => {
          const validationMessage = getValidationMessage(action as Error);
          return [
            new statusActions.SetAttemptingLogin(false),
            new statusActions.SetValidationMessage(validationMessage)
          ];
        }));

  @Effect() routeNavigate$ =
    this.actions$
      .pipe(
        ofType(fromRouter.ROUTER_NAVIGATION),
        mergeMap(() => [
          new statusActions.SetValidationMessage('')
        ]));

  @Effect() login$ =
    this.actions$
      .pipe(
        ofType(userActions.EMAIL_LOGIN,
          userActions.SIGNUP,
          userActions.GOOGLE_LOGIN,
          userActions.FACEBOOK_LOGIN,
          userActions.TWITTER_LOGIN),
        mergeMap(() => [
          new statusActions.SetAttemptingLogin(true)
        ]));

  @Effect() postLogin$ =
    this.actions$
      .pipe(
        ofType(userActions.AUTHENTICATED, userActions.NOT_AUTHENTICATED),
        mergeMap(() => [
          new statusActions.SetAttemptingLogin(false)
        ]));
}
