import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';

import * as userActions from '../../actions/user.actions';

import { State } from '../../reducers/root.reducer';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  password = new FormControl('', [
    Validators.required
  ]);
  loginForm: FormGroup;

  icons = {
    google: faGoogle
  };
  constructor(private store: Store<State>, private builder: FormBuilder) { }

  ngOnInit() {
    this.store.dispatch(new userActions.GetUser());
    this.loginForm = this.builder.group({
      email: this.email,
      password: this.password
    });
  }

  googleLogin() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  emailLogin() {
    if (this.loginForm.valid) {
      this.store.dispatch(new userActions.EmailLogin(this.email.value, this.password.value));
    }
  }
}
