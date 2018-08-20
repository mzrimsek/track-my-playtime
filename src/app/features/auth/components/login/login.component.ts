import { Component, OnInit } from '@angular/core';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as userActions from '../../actions/user.actions';

import rootComponentSelectors, { State } from '../../../../reducers/root.reducer';

import { EmailAuthEvent } from '../../models';

import { getValidationMessage } from '../../utils/validation.utils';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  icons = {
    google: faGoogle
  };
  validationMessage$: Observable<string>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new userActions.GetUser());
    this.validationMessage$ = this.store.select(rootComponentSelectors.error).map(error => getValidationMessage(error));
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
