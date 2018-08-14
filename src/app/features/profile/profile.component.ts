import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { UserService } from '../auth/services/user.service';

import { State } from './reducers/root.reducer';

import { User } from '../auth/models';
import { Profile } from './models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  profile$: Observable<Profile>;
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }
}
