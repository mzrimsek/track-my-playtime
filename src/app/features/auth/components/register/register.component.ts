import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as userActions from 'features/auth/actions/user.actions';
import authComponentSelectors, { State } from 'features/auth/reducers/root.reducer';
import { Observable } from 'rxjs';

import { EmailAuthEvent } from 'features/auth/models';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loggingIn$: Observable<boolean>;
  message$: Observable<string>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.loggingIn$ = this.store.select(authComponentSelectors.loggingIn);
    this.message$ = this.store.select(authComponentSelectors.validationMessage);
  }

  googleSignUp() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  facebookSignUp() {
    this.store.dispatch(new userActions.FacebookLogin());
  }

  twitterSignUp() {
    this.store.dispatch(new userActions.TwitterLogin());
  }

  emailSignUp(event: EmailAuthEvent) {
    this.store.dispatch(new userActions.SignUp(event.email, event.password));
  }
}
