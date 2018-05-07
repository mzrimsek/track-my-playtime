import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as userActions from '../actions/user.actions';

import authComponentSelectors, { State } from '../reducers/root.reducer';

import { User } from '../models';

@Injectable()
export class UserService {

  private user: User;
  constructor(private store: Store<State>) { }

  getUser(): User {
    this.store.select(authComponentSelectors.user).subscribe(user => this.user = user);
    return this.user;
  }

  logout(): void {
    this.store.dispatch(new userActions.Logout());
  }
}
