import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../../shared/shared.module';

import { TimeDateGraphComponent } from './components/time-date-graph/time-date-graph.component';
import { TimeGameGraphComponent } from './components/time-game-graph/time-game-graph.component';
import {
    TimePlatformGraphComponent
} from './components/time-platform-graph/time-platform-graph.component';
import { DashboardComponent } from './dashboard.component';

import { GraphService } from './services/graph.service';
import { GraphTooltipComponent } from './components/graph-tooltip/graph-tooltip.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    SharedModule
  ],
  declarations: [DashboardComponent, TimeDateGraphComponent, TimeGameGraphComponent, TimePlatformGraphComponent, GraphTooltipComponent],
  providers: [GraphService]
})
export class DashboardModule { }
