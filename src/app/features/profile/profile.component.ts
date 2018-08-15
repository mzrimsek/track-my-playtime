import { Component, OnInit } from '@angular/core';

import { UserService } from '../auth/services/user.service';

import { User } from '../auth/models';
import { UserInfo } from './models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  userInfo: UserInfo;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.userInfo = this.userService.getUserInfo();
  }
}
