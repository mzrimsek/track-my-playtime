import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as userActions from '../actions/user.actions';

import profileComponentSelectors, {
    State as ProfileState
} from '../../profile/reducers/root.reducer';
import authComponentSelectors, { State } from '../reducers/root.reducer';

import { UserInfo } from '../../profile/models';
import { User } from '../models';

import { getDisplayName, getImgSrc } from '../../profile/utils/userinfo.utils';

@Injectable()
export class UserService {

  private user: User;
  private userInfo: UserInfo;
  constructor(private store: Store<State>, private profileStore: Store<ProfileState>) { }

  getUser(): User {
    this.store.select(authComponentSelectors.user).subscribe(user => this.user = user);
    return this.user;
  }

  getUserInfo(): UserInfo {
    this.profileStore.select(profileComponentSelectors.info).subscribe(profile => {
      this.userInfo = {
        displayName: getDisplayName(this.user, profile),
        email: this.user.email,
        imgSrc: getImgSrc(this.user)
      };
    });
    return this.userInfo;
  }

  logout(): void {
    this.store.dispatch(new userActions.Logout());
  }
}
