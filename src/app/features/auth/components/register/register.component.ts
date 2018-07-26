import { Component, OnInit } from '@angular/core';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';

import * as userActions from '../../actions/user.actions';

import { State } from '../../reducers/root.reducer';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  icons = {
    google: faGoogle
  };
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  googleSignUp() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  emailSignUp() {
    const email = '';
    const password = '';
    this.store.dispatch(new userActions.SignUp(email, password));
  }
}
