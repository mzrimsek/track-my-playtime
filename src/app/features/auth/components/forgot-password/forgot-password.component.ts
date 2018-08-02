import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as userActions from '../../actions/user.actions';

import { State } from '../../reducers/root.reducer';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  message = '';
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  resetPassword(emailInputEl: HTMLInputElement) {
    if (emailInputEl.value) {
      const email = emailInputEl.value;
      this.store.dispatch(new userActions.ResetPassword(email));
      this.message = `An password reset email has been sent to ${email}`;
    }
  }
}
