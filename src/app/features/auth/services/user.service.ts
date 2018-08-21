import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as userActions from '../actions/user.actions';

import profileComponentSelectors, {
    State as ProfileState
} from '../../profile/reducers/root.reducer';
import authComponentSelectors, { State } from '../reducers/root.reducer';

import { Profile } from '../../profile/models';
import { User, UserInfo } from '../models';

import { getDisplayName, getImgSrc, getProviderFrom } from '../../profile/utils/userinfo.utils';

@Injectable()
export class UserService {

  private user$: Observable<User>;
  private profile$: Observable<Profile>;
  constructor(private store: Store<State>, private profileStore: Store<ProfileState>) {
    this.user$ = this.store.select(authComponentSelectors.user);
    this.profile$ = this.profileStore.select(profileComponentSelectors.info);
  }

  getUser(): Observable<User> {
    return this.user$;
  }

  getUserInfo(): Observable<UserInfo> {
    return this.user$.combineLatest(this.profile$, (user: User, profile: Profile) => {
      return {
        displayName: getDisplayName(user, profile),
        email: user.email,
        imgSrc: getImgSrc(user),
        provider: getProviderFrom(user.providerId)
      };
    });
  }

  logout(): void {
    this.store.dispatch(new userActions.Logout());
  }
}
