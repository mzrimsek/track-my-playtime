import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProfileComponent } from './profile.component';

import { ProfileEffects } from './effects/profile.effects';

import { ProfileService } from './services/profile.service';

import { reducers } from './reducers/root.reducer';
import { EditDisplayNameComponent } from './components/edit-display-name/edit-display-name.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  declarations: [ProfileComponent, EditDisplayNameComponent],
  providers: [ProfileService]
})
export class ProfileModule { }
