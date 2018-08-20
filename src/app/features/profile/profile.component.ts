import { Component, OnInit } from '@angular/core';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
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

  userInfo: UserInfo;
  message = '';
  editName = false;
  icons = {
    edit: faEdit
  };
  constructor(private store: Store<AuthState>, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(userInfo => this.userInfo = userInfo);
  }

  sendResetPasswordLink() {
    this.store.dispatch(new userActions.ResetPassword(this.userInfo.email));
    this.message = `A password reset email has been sent to ${this.userInfo.email}`;
  }

  setEditName(editName: boolean) {
    this.editName = editName;
  }
}
