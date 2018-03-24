import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import authComponentSelectors, { State } from '../reducers/root.reducer';
import { User } from '../models';
import * as userActions from '../actions/user.actions';

@Injectable()
export class UserService {

  constructor(private store: Store<State>) { }

  isLoggedIn(): Observable<boolean> {
    return this.store.select(authComponentSelectors.isUserLoggedIn);
  }

  getUser(): Observable<User> {
    return this.store.select(authComponentSelectors.user);
  }

  logout(): void {
    this.store.dispatch(new userActions.Logout());
  }
}
