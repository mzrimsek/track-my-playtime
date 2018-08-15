import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserService } from '../auth/services/user.service';

import profileComponentSelectors, { State } from './reducers/root.reducer';

import { User } from '../auth/models';
import { UserInfo } from './models';

import { getDisplayName, getImgSrc } from './utils/userinfo.utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  userInfo: UserInfo;
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.store.select(profileComponentSelectors.info).subscribe(profile => {
      this.userInfo = {
        displayName: getDisplayName(this.user, profile),
        email: this.user.email,
        imgSrc: getImgSrc(this.user)
      };
    });

  }

}
