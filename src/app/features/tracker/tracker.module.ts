import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { SharedModule } from '../../shared/shared.module';

import { HistoryEntryComponent } from './components/history-entry/history-entry.component';
import { HistoryComponent } from './components/history/history.component';
import { TimerComponent } from './components/timer/timer.component';
import { TrackerComponent } from './tracker.component';

import { AuthEffects } from './effects/auth.effects';
import { HistoryEffects } from './effects/history.effects';
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
    FontAwesomeModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    StoreModule.forFeature('tracker', reducers),
    EffectsModule.forFeature([AuthEffects, TimerEffects, HistoryEffects, PlatformsEffects]),
    SharedModule
  ],
  declarations: [TrackerComponent, TimerComponent, HistoryComponent, HistoryEntryComponent],
  providers: [ClockService, HistoryService, PlatformsService, UserService]
})
export class TrackerModule { }
