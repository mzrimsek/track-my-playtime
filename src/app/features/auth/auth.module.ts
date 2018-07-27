import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthEffects } from './effects/auth.effects';
import { UserEffects } from './effects/user.effects';

import { AuthService } from './services/auth.service';

import { reducers } from './reducers/root.reducer';

import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([UserEffects, AuthEffects])
  ],
  declarations: [LoginComponent, RegisterComponent, AuthFormComponent],
  providers: [AuthService]
})
export class AuthModule { }
