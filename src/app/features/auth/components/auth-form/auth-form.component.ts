import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { EmailAuthEvent } from '../../models';

@Component({
  selector: 'app-auth-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit {

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  authForm: FormGroup;
  @Input() trackingCategory: string;
  @Output() emailAuth: EventEmitter<EmailAuthEvent> = new EventEmitter();
  @Output() googleAuth: EventEmitter<null> = new EventEmitter();

  icons = {
    google: faGoogle
  };
  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.authForm = this.builder.group({
      email: this.email,
      password: this.password
    });
  }

  emitEmailAuth() {
    if (this.authForm.valid) {
      this.emailAuth.emit({
        email: this.email.value,
        password: this.password.value
      });
    }
  }

  emitGoogleAuth() {
    this.googleAuth.emit(null);
  }
}
