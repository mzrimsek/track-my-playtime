import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { EmailAuthEvent } from '../../models';

@Component({
  selector: 'app-auth-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit {

  @Input() message = '';
  @Input() loggingIn = false;
  @Input() trackingCategory: string;
  @Output() emailAuth: EventEmitter<EmailAuthEvent> = new EventEmitter();
  @Output() googleAuth: EventEmitter<null> = new EventEmitter();
  @Output() facebookAuth: EventEmitter<null> = new EventEmitter();
  @Output() twitterAuth: EventEmitter<null> = new EventEmitter();
  authForm: FormGroup;
  icons = {
    google: faGoogle,
    facebook: faFacebook,
    twitter: faTwitter
  };
  constructor(private builder: FormBuilder) { }

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
  }

  emitGoogleAuth() {
    this.googleAuth.emit(null);
  }

  emitFacebookAuth() {
    this.facebookAuth.emit(null);
  }

  emitTwitterAuth() {
    this.twitterAuth.emit(null);
  }
}
