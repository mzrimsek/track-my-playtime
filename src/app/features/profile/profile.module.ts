import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import {
    EditDisplayNameComponent
} from './components/edit-display-name/edit-display-name.component';
import { ProfileComponent } from './profile.component';

import { ProfileEffects } from './effects/profile.effects';
import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  declarations: [
    ProfileComponent,
    EditDisplayNameComponent
  ]
})
export class ProfileModule { }
