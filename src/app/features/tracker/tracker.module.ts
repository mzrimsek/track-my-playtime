import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';

import { TrackerComponent } from './tracker.component';
import { TimerComponent } from './components/timer/timer.component';
import { HistoryComponent } from './components/history/history.component';
import { HistoryEntryComponent } from './components/history-entry/history-entry.component';

import { ClockService } from './services/clock.service';
import { TimerService } from './services/timer.service';
import { HistoryService } from './services/history.service';
import { PlatformsService } from './services/platforms.service';

import { TrackerInitializationEffects } from './effects/initialization.effects';
import { TimerEffects } from './effects/timer.effects';
import { HistoryEffects } from './effects/history.effects';
import { PlatformsEffects } from './effects/platforms.effects';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tracker', reducers),
    EffectsModule.forFeature([TrackerInitializationEffects, TimerEffects, HistoryEffects, PlatformsEffects]),
    SharedModule
  ],
  declarations: [TrackerComponent, TimerComponent, HistoryComponent, HistoryEntryComponent],
  providers: [ClockService, TimerService, HistoryService, PlatformsService]
})
export class TrackerModule { }
