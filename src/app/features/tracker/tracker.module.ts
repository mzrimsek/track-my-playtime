import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';

import { TrackerComponent } from './tracker.component';
import { TimerComponent } from './components/timer/timer.component';
import { HistoryComponent } from './components/history/history.component';

import { ClockService } from './services/clock.service';
import { TimerService } from './services/timer.service';
import { HistoryService } from './services/history.service';

import { TrackerInitializationEffects } from './effects/initialization.effects';
import { TimerEffects } from './effects/timer.effects';
import { HistoryEffects } from './effects/history.effects';

import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tracker', reducers),
    EffectsModule.forFeature([TrackerInitializationEffects, TimerEffects, HistoryEffects]),
    SharedModule
  ],
  declarations: [TrackerComponent, TimerComponent, HistoryComponent],
  providers: [ClockService, TimerService, HistoryService]
})
export class TrackerModule { }
