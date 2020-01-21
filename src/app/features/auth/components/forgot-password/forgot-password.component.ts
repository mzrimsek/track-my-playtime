import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as userActions from 'features/auth/actions/user.actions';
import { State } from 'features/auth/reducers/root.reducer';

@Component({
  selector: 'app-auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  message = '';
  passwordForm: FormGroup;
  constructor(private store: Store<State>, private builder: FormBuilder) { }

  ngOnInit() {
    this.passwordForm = this.builder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  resetPassword() {
    if (this.passwordForm.valid) {
      const email = this.passwordForm.value.email;
      this.store.dispatch(new userActions.ResetPassword(email));
      this.message = `A password reset email has been sent to ${email}`;
    }
  }
}
