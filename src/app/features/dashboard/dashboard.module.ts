import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardComponent } from './dashboard.component';

import { TrackerService } from '../tracker/services/tracker.service';
import { GraphService } from './services/graph.service';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  declarations: [DashboardComponent],
  providers: [TrackerService, GraphService]
})
export class DashboardModule { }
