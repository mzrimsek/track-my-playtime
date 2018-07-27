import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-auth-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit {

  @Input() authForm: FormGroup;
  @Input() email: FormControl;
  @Input() password: FormControl;
  @Input() trackingCategory: string;
  @Output() emailAuth: EventEmitter<any> = new EventEmitter();
  @Output() googleAuth: EventEmitter<any> = new EventEmitter();

  icons = {
    google: faGoogle
  };
  constructor() { }

  ngOnInit() { }
}
