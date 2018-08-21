import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as userActions from '../../actions/user.actions';

import { State } from '../../../../reducers/root.reducer';

import { EmailAuthEvent } from '../../models';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new userActions.GetUser());
  }

  googleLogin() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  facebookLogin() {
    this.store.dispatch(new userActions.FacebookLogin());
  }

  emailLogin(event: EmailAuthEvent) {
    this.store.dispatch(new userActions.EmailLogin(event.email, event.password));
  }
}
