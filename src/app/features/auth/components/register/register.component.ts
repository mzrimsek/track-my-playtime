import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as userActions from '../../actions/user.actions';

import rootComponentSelectors, { State } from '../../../../reducers/root.reducer';

import { EmailAuthEvent } from '../../models';

import { getValidationMessage } from '../../utils/validation.utils';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validationMessage$: Observable<string>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.validationMessage$ = this.store.select(rootComponentSelectors.error).map(error => getValidationMessage(error));
  }

  googleSignUp() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  facebookSignUp() {
    this.store.dispatch(new userActions.FacebookLogin());
  }

  emailSignUp(event: EmailAuthEvent) {
    this.store.dispatch(new userActions.SignUp(event.email, event.password));
  }
}
