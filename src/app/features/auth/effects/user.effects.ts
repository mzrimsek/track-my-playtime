import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User as AuthUser } from '@firebase/auth-types';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

import * as appActions from '../../../actions/app.actions';
import * as userActions from '../actions/user.actions';

import { User } from '../models';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  @Effect() getUser$ =
    this.actions$
      .ofType(userActions.GET_USER)
      .map(action => action as userActions.GetUser)
      .switchMap(() => this.authService.getAuthState()
        .map(authData => {
          if (authData) {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'app';
            this.router.navigate([returnUrl]);
            return this.getAuthenticatedAction(authData);
          }
          return new userActions.NotAuthenticated();
        })
        .catch(err => Observable.of(new appActions.Error(userActions.GET_USER, err.message))));

  @Effect() googleLogin$ =
    this.actions$
      .ofType(userActions.GOOGLE_LOGIN)
      .map(action => action as userActions.GoogleLogin)
      .switchMap(() => this.authService.signInWithGoogle()
        .map(() => new userActions.GetUser())
        .catch(err => Observable.of(new appActions.Error(userActions.GOOGLE_LOGIN, err.message))));

  @Effect() logout$ =
    this.actions$
      .ofType(userActions.LOGOUT)
      .map(action => action as userActions.Logout)
      .switchMap(() => this.authService.signOut()
        .map(() => {
          this.router.navigate(['login']);
          return new userActions.NotAuthenticated();
        })
        .catch(err => Observable.of(new appActions.Error(userActions.LOGOUT, err.message))));

  private getAuthenticatedAction(authData: AuthUser): userActions.Authenticated {
    const user = <User>{
      uid: authData.uid,
      displayName: authData.displayName,
      email: authData.email,
      photoURL: authData.photoURL
    };
    return new userActions.Authenticated(user);
  }
}
