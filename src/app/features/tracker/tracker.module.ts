import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './tracker.component';
import { TimerComponent } from './components/timer/timer.component';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TrackerComponent, TimerComponent, HistoryComponent]
})
export class TrackerModule { }
