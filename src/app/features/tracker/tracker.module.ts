import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { TrackerComponent } from './tracker.component';
import { TimerComponent } from './components/timer/timer.component';
import { HistoryComponent } from './components/history/history.component';

import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tracker', reducers)
  ],
  declarations: [TrackerComponent, TimerComponent, HistoryComponent]
})
export class TrackerModule { }
