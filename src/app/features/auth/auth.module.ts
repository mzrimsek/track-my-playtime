import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthEffects } from './effects/auth.effects';
import { StatusEffects } from './effects/status.effects';
import { UserEffects } from './effects/user.effects';

import { AuthService } from './services/auth.service';

import { reducers } from './reducers/root.reducer';

import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      UserEffects,
      AuthEffects,
      StatusEffects
    ])
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthFormComponent,
    ForgotPasswordComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
