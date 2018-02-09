import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TrackerComponent } from './tracker.component';
import { TimerComponent } from './components/timer/timer.component';
import { HistoryComponent } from './components/history/history.component';

import { TimerInitializationEffects } from './effects/initialization.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tracker', reducers),
    EffectsModule.forFeature([TimerInitializationEffects])
  ],
  declarations: [TrackerComponent, TimerComponent, HistoryComponent]
})
export class TrackerModule { }
