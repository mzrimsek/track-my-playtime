import { Component, OnInit } from '@angular/core';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';

import * as userActions from '../../actions/user.actions';

import { State } from '../../reducers/root.reducer';

import {
    FormBuilder, FormControl, FormGroup, Validators
} from '../../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  password = new FormControl('', [
    Validators.required
  ]);
  registerForm: FormGroup;

  icons = {
    google: faGoogle
  };
  constructor(private store: Store<State>, private builder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.builder.group({
      email: this.email,
      password: this.password
    });
  }

  googleSignUp() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  emailSignUp() {
    if (this.registerForm.valid) {
      this.store.dispatch(new userActions.SignUp(this.email.value, this.password.value));
    }
  }
}
