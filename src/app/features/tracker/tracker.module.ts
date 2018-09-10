import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { SharedModule } from '../../shared/shared.module';
import { TrackerRoutingModule } from './tracker-routing.module';

import { HistoryEntryComponent } from './components/history-entry/history-entry.component';
import { HistoryComponent } from './components/history/history.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import {
    LockedHistoryEntryComponent
} from './components/locked-history-entry/locked-history-entry.component';
import { TimerComponent } from './components/timer/timer.component';
import { TrackerComponent } from './tracker.component';

import { HistoryEffects } from './effects/history.effects';
import { PlatformsEffects } from './effects/platforms.effects';
import { TimerEffects } from './effects/timer.effects';

import { ElapsedTimeService } from '../../shared/services/elapsed-time.service';
import { UserService } from '../auth/services/user.service';
import { HistoryService } from './services/history.service';
import { PlatformsService } from './services/platforms.service';
import { TimerService } from './services/timer.service';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgSelectModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule,
    TrackerRoutingModule,
    StoreModule.forFeature('tracker', reducers),
    EffectsModule.forFeature([
      TimerEffects,
      HistoryEffects,
      PlatformsEffects
    ]),
  ],
  declarations: [
    TrackerComponent,
    TimerComponent,
    HistoryComponent,
    HistoryEntryComponent,
    LoadMoreComponent,
    LockedHistoryEntryComponent
  ],
  providers: [
    HistoryService,
    PlatformsService,
    UserService,
    TimerService,
    ElapsedTimeService
  ]
})
export class TrackerModule { }
