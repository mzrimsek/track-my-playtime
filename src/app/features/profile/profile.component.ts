import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserService } from '../auth/services/user.service';

import * as userActions from '../auth/actions/user.actions';

import { State as AuthState } from '../auth/reducers/root.reducer';

import { UserInfo } from '../auth/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId: string;
  userInfo: UserInfo;
  message = '';
  constructor(private store: Store<AuthState>, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.userId = user.uid);
    this.userService.getUserInfo().subscribe(userInfo => this.userInfo = userInfo);
  }

  sendResetPasswordLink() {
    this.store.dispatch(new userActions.ResetPassword(this.userInfo.email));
    this.message = `A password reset email has been sent to ${this.userInfo.email}`;
  }
}
