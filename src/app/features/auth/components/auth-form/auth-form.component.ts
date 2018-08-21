import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';

import rootComponentSelectors, { State } from '../../../../reducers/root.reducer';

import { EmailAuthEvent } from '../../models';

import { getValidationMessage } from '../../utils/validation.utils';

@Component({
  selector: 'app-auth-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit {

  @Input() trackingCategory: string;
  @Output() emailAuth: EventEmitter<EmailAuthEvent> = new EventEmitter();
  @Output() googleAuth: EventEmitter<null> = new EventEmitter();
  @Output() facebookAuth: EventEmitter<null> = new EventEmitter();
  authForm: FormGroup;
  message = '';
  showMessage = false;
  icons = {
    google: faGoogle,
    facebook: faFacebook
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
  }

  emitEmailAuth() {
    if (this.authForm.valid) {
      this.emailAuth.emit({
        email: this.authForm.value.email,
        password: this.authForm.value.password
      });
    }
    this.setMessage();
  }

  emitGoogleAuth() {
    this.googleAuth.emit(null);
    this.setMessage();
  }

  emitFacebookAuth() {
    this.facebookAuth.emit(null);
    this.setMessage();
  }

  private setMessage() {
    const message$ = this.store.select(rootComponentSelectors.error).map(error => getValidationMessage(error));
    message$.subscribe(message => this.message = message);
    this.showMessage = true;
  }
}
