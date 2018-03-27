import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';

import { HistoryEntryComponent } from './components/history-entry/history-entry.component';
import { HistoryComponent } from './components/history/history.component';
import { TimerComponent } from './components/timer/timer.component';
import { TrackerComponent } from './tracker.component';

import { HistoryEffects } from './effects/history.effects';
import { TrackerInitializationEffects } from './effects/initialization.effects';
import { PlatformsEffects } from './effects/platforms.effects';
import { TimerEffects } from './effects/timer.effects';

import { UserService } from '../auth/services/user.service';
import { ClockService } from './services/clock.service';
import { HistoryService } from './services/history.service';
import { PlatformsService } from './services/platforms.service';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tracker', reducers),
    EffectsModule.forFeature([TrackerInitializationEffects, TimerEffects, HistoryEffects, PlatformsEffects]),
    SharedModule
  ],
  declarations: [TrackerComponent, TimerComponent, HistoryComponent, HistoryEntryComponent],
  providers: [ClockService, HistoryService, PlatformsService, UserService]
})
export class TrackerModule { }
