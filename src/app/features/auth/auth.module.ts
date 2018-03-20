import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AngularFireAuthModule } from 'angularfire2/auth';

import { LoginComponent } from './components/login/login.component';

import { UserEffects } from './effects/user.effects';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
