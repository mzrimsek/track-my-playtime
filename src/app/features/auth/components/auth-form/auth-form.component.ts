import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';

import * as userActions from '../../actions/user.actions';

import rootComponentSelectors, { State } from '../../../../reducers/root.reducer';

import { EmailAuthEvent } from '../../models';

@Component({
  selector: 'app-auth-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit {

  authForm: FormGroup;
  message = '';
  @Input() trackingCategory: string;
  @Output() emailAuth: EventEmitter<EmailAuthEvent> = new EventEmitter();
  @Output() googleAuth: EventEmitter<null> = new EventEmitter();

  icons = {
    google: faGoogle
  };
  constructor(private store: Store<State>, private builder: FormBuilder) { }

  ngOnInit() {
    this.authForm = this.builder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.store.select(rootComponentSelectors.error).subscribe(error => {
      switch (error.action) {
        case userActions.SIGNUP: {
          this.message = 'Email address already in use.';
          break;
        }
        case userActions.EMAIL_LOGIN: {
          this.message = 'Email or password invalid.';
          break;
        }
        default: {
          this.message = error.message;
        }
      }
    });
  }

  emitEmailAuth() {
    if (this.authForm.valid) {
      this.emailAuth.emit({
        email: this.authForm.value.email,
        password: this.authForm.value.password
      });
    }
  }

  emitGoogleAuth() {
    this.googleAuth.emit(null);
  }
}
