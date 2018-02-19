import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TrackerComponent } from './tracker.component';
import { TimerComponent } from './components/timer/timer.component';
import { HistoryComponent } from './components/history/history.component';

import { ClockService } from './services/clock.service';

import { TrackerInitializationEffects } from './effects/initialization.effects';
import { TimerEffects } from './effects/timer.effects';
import { HistoryEffects } from './effects/history.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tracker', reducers),
    EffectsModule.forFeature([TrackerInitializationEffects, TimerEffects, HistoryEffects])
  ],
  declarations: [TrackerComponent, TimerComponent, HistoryComponent],
  providers: [ClockService]
})
export class TrackerModule { }
