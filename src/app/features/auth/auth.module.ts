import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './components/login/login.component';

import { AuthEffects } from './effects/auth.effects';
import { UserEffects } from './effects/user.effects';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([UserEffects, AuthEffects])
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
