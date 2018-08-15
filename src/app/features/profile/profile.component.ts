import { Component, OnInit } from '@angular/core';

import { UserService } from '../auth/services/user.service';

import { User, UserInfo } from '../auth/models';

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
    this.userService.getUser().subscribe(user => this.user = user);
    this.userService.getUserInfo().subscribe(userInfo => this.userInfo = userInfo);
  }
}
