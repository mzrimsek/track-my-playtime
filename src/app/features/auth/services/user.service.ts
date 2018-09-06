import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { combineLatest, Observable } from 'rxjs';

import * as userActions from '../actions/user.actions';

import profileComponentSelectors, {
    State as ProfileState
} from '../../profile/reducers/root.reducer';
import authComponentSelectors, { State } from '../reducers/root.reducer';

import { Profile } from '../../profile/models';
import { User, UserInfo } from '../models';

import {
    getDisplayName, getEmail, getImgSrc, getProviderFrom
} from '../../profile/utils/userinfo.utils';

@Injectable()
export class UserService {

  constructor(private store: Store<State>, private profileStore: Store<ProfileState>) { }

  getUser(): Observable<User> {
    return this.store.select(authComponentSelectors.user);
  }

  getUserInfo(): Observable<UserInfo> {
    const user$ = this.getUser();
    const profile$ = this.profileStore.select(profileComponentSelectors.info);

    return combineLatest(user$, profile$, (user: User, profile: Profile) => {
      return {
        displayName: getDisplayName(user, profile),
        email: getEmail(user),
        imgSrc: getImgSrc(user),
        provider: getProviderFrom(user.providerId)
      };
    });
  }

  logout(): void {
    this.store.dispatch(new userActions.Logout());
  }
}
