import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardComponent } from './dashboard.component';

import { TrackerService } from '../tracker/services/tracker.service';
import { GraphService } from './services/graph.service';
import { TimeDateGraphComponent } from './components/time-date-graph/time-date-graph.component';
import { TimeGameGraphComponent } from './components/time-game-graph/time-game-graph.component';
import { TimePlatformGraphComponent } from './components/time-platform-graph/time-platform-graph.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  declarations: [DashboardComponent, TimeDateGraphComponent, TimeGameGraphComponent, TimePlatformGraphComponent],
  providers: [TrackerService, GraphService]
})
export class DashboardModule { }
