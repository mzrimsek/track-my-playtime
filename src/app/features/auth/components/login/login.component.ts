import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as userActions from '../../actions/user.actions';

import authComponentSelectors, { State } from '../../reducers/root.reducer';

import { EmailAuthEvent } from '../../models';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggingIn$: Observable<boolean>;
  message$: Observable<string>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new userActions.GetUser());
    this.loggingIn$ = this.store.select(authComponentSelectors.loggingIn);
    this.message$ = this.store.select(authComponentSelectors.validationMessage);
  }

  googleLogin() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  facebookLogin() {
    this.store.dispatch(new userActions.FacebookLogin());
  }

  twitterLogin() {
    this.store.dispatch(new userActions.TwitterLogin());
  }

  emailLogin(event: EmailAuthEvent) {
    this.store.dispatch(new userActions.EmailLogin(event.email, event.password));
  }
}
