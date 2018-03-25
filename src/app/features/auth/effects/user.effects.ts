import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { User } from '../models';
import * as userActions from '../actions/user.actions';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private afAuth: AngularFireAuth, private router: Router) { }

  @Effect() getUser$ =
    this.actions$
      .ofType(userActions.GET_USER)
      .map(action => action as userActions.GetUser)
      .map(action => action.payload)
      .switchMap(() => this.afAuth.authState
        .map(authData => {
          if (authData) {
            const user = <User>{
              uid: authData.uid,
              displayName: authData.displayName
            };
            this.router.navigate(['/app']);
            return new userActions.Authenticated(user);
          } else {
            return new userActions.NotAuthenticated();
          }
        })
        .catch(err =>
          Observable.of(new userActions.AuthError({ error: err.message }))
        )
      );

  @Effect() googleLogin$ =
    this.actions$
      .ofType(userActions.GOOGLE_LOGIN)
      .map(action => action as userActions.GoogleLogin)
      .map(action => action.payload)
      .switchMap(() => Observable.fromPromise(this.googleLogin())
        .map(() => {
          return new userActions.GetUser();
        })
        .catch(err =>
          Observable.of(new userActions.AuthError({ error: err.message }))
        )
      );

  @Effect() logout$ =
    this.actions$
      .ofType(userActions.LOGOUT)
      .map(action => action as userActions.Logout)
      .map(action => action.payload)
      .switchMap(() => Observable.of(this.afAuth.auth.signOut())
        .map(() => {
          this.router.navigate(['/login']);
          return new userActions.NotAuthenticated();
        })
        .catch(err =>
          Observable.of(new userActions.AuthError({ error: err.message }))
        )
      );

  private googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
