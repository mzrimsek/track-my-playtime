import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as userActions from '../../actions/user.actions';

import { State } from '../../reducers/root.reducer';

import { EmailAuthEvent } from '../../models';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() { }

  googleSignUp() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  emailSignUp(event: EmailAuthEvent) {
    this.store.dispatch(new userActions.SignUp(event.email, event.password));
  }
}
