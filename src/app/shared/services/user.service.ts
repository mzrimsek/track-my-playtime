import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import authComponentSelectors, { State } from '../../features/auth/reducers/root.reducer';
import { User } from '../../features/auth/models';
import * as userActions from '../../features/auth/actions/user.actions';

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
