import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User as AuthUser } from '@firebase/auth-types';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as appActions from 'app/actions/app.actions';
import * as userActions from 'features/auth/actions/user.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthService } from 'features/auth/services/auth.service';

import { User } from 'features/auth/models';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  @Effect() getUser$ =
    this.actions$
      .pipe(
        ofType(userActions.GET_USER),
        map(action => action as userActions.GetUser),
        switchMap(() => this.authService.getAuthState()
          .pipe(
            map(authData => {
              if (authData) {
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'app';
                this.router.navigate([returnUrl]);
                return this.getAuthenticatedAction(authData);
              }
              return new userActions.NotAuthenticated();
            }),
            catchError(err => of(new appActions.Error(userActions.GET_USER, err.message))))));

  @Effect() googleLogin$ =
    this.actions$
      .pipe(
        ofType(userActions.GOOGLE_LOGIN),
        map(action => action as userActions.GoogleLogin),
        switchMap(() => this.authService.signInWithGoogle()
          .pipe(
            map(() => new userActions.GetUser()),
            catchError(err => of(new appActions.Error(userActions.GOOGLE_LOGIN, err.message))))));

  @Effect() facebookLogin$ =
    this.actions$
      .pipe(
        ofType(userActions.FACEBOOK_LOGIN),
        map(action => action as userActions.FacebookLogin),
        switchMap(() => this.authService.signInWithFacebook()
          .pipe(
            map(() => new userActions.GetUser()),
            catchError(err => of(new appActions.Error(userActions.FACEBOOK_LOGIN, err.message))))));

  @Effect() twitterLogin$ =
    this.actions$
      .pipe(
        ofType(userActions.TWITTER_LOGIN),
        map(action => action as userActions.TwitterLogin),
        switchMap(() => this.authService.signInWithTwitter()
          .pipe(
            map(() => new userActions.GetUser()),
            catchError(err => of(new appActions.Error(userActions.TWITTER_LOGIN, err.message))))));

  @Effect() logout$ =
    this.actions$
      .pipe(
        ofType(userActions.LOGOUT),
        map(action => action as userActions.Logout),
        switchMap(() => this.authService.signOut()
          .pipe(
            map(() => {
              this.router.navigate(['login']);
              return new userActions.NotAuthenticated();
            }),
            catchError(err => of(new appActions.Error(userActions.LOGOUT, err.message))))));

  @Effect() signUp$ =
    this.actions$
      .pipe(
        ofType(userActions.SIGNUP),
        map(action => action as userActions.SignUp),
        switchMap(action => this.authService.signUpWithEmail(action.email, action.password)
          .pipe(
            map(() => new userActions.GetUser()),
            catchError(err => of(new appActions.Error(userActions.SIGNUP, err.message))))));

  @Effect() emailLogin$ =
    this.actions$
      .pipe(
        ofType(userActions.EMAIL_LOGIN),
        map(action => action as userActions.EmailLogin),
        switchMap(action => this.authService.signInWithEmail(action.email, action.password)
          .pipe(
            map(() => new userActions.GetUser()),
            catchError(err => of(new appActions.Error(userActions.EMAIL_LOGIN, err.message))))));

  @Effect() resetPassword$ =
    this.actions$
      .pipe(
        ofType(userActions.RESET_PASSWORD),
        map(action => action as userActions.ResetPassword),
        switchMap(action => this.authService.resetPassword(action.email)
          .pipe(catchError(err => of(new appActions.Error(userActions.RESET_PASSWORD, err.message))))));

  private getAuthenticatedAction(authData: AuthUser): userActions.Authenticated {
    const providerData = authData.providerData[0];
    const user = <User>{
      uid: authData.uid,
      displayName: authData.displayName,
      email: authData.email,
      photoURL: authData.photoURL,
      providerId: providerData ? providerData.providerId : ''
    };
    return new userActions.Authenticated(user);
  }
}
