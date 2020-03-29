import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as userActions from 'features/auth/actions/user.actions';

import authComponentSelectors, { State } from 'features/auth/reducers/root.reducer';
import profileComponentSelectors, {
    State as ProfileState
} from 'features/profile/reducers/root.reducer';

import { User, UserInfo } from 'features/auth/models';

import {
    getDisplayName, getEmail, getImgSrc, getProviderFrom
} from 'features/profile/utils/userinfo.utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store: Store<State>, private profileStore: Store<ProfileState>) { }

  getUser(): Observable<User> {
    return this.store.pipe(select(authComponentSelectors.user));
  }

  getUserInfo(): Observable<UserInfo> {
    const user$ = this.getUser();
    const profile$ = this.profileStore.pipe(select(profileComponentSelectors.info));

    return combineLatest([user$, profile$]).pipe(map(([user, profile]) => {
      return {
        displayName: getDisplayName(user, profile),
        email: getEmail(user),
        imgSrc: getImgSrc(user),
        provider: getProviderFrom(user.providerId)
      };
    }));
  }

  logout(): void {
    this.store.dispatch(new userActions.Logout());
  }
}
