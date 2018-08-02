import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { EmailAuthEvent } from '../../models';

@Component({
  selector: 'app-auth-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit {

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
}
