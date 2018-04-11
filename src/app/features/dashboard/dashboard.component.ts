import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { GraphService } from './services/graph.service';

import { BarGraphConfig, GraphDataItem, PieChartConfig } from './models';

import { formatElapsedTime } from '../../shared/utils/date.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  timeVsDateGraphData$: Observable<GraphDataItem[]>;
  timeVsPlatformGraphData$: Observable<GraphDataItem[]>;
  timeVsGameGraphData$: Observable<GraphDataItem[]>;
  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.timeVsDateGraphData$ = this.graphService.getTimeVsDateGraphData();
    this.timeVsPlatformGraphData$ = this.graphService.getTimeVsPlatformGraphData();
    this.timeVsGameGraphData$ = this.graphService.getTimeVsGameGraphData();
  }

  getTimeDateGraphConfig(): BarGraphConfig {
    return {
      view: [700, 400],
      colorScheme: {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      },
      showLegend: true,
      gradient: false,
      showXAxis: true,
      showYAxis: true,
      showXAxisLabel: true,
      showYAxisLabel: true,
      xAxisLabel: 'Date',
      yAxisLabel: 'Total Time Played',
      axisTickFormatting: formatElapsedTime
    };
  }

  getTimePlatformGraphConfig(): PieChartConfig {
    return {
      view: [700, 400],
      colorScheme: {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      },
      showLegend: true,
      gradient: false,
      showLabels: true,
      explodeSlices: false,
      doughnut: false,
      tooltipTextFormatting: formatElapsedTime
    };
  }

  getTimeGameGraphConfig(): BarGraphConfig {
    return {
      view: [700, 400],
      colorScheme: {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      },
      showLegend: true,
      gradient: false,
      showXAxis: true,
      showYAxis: true,
      showXAxisLabel: true,
      showYAxisLabel: true,
      xAxisLabel: 'Total Time Played',
      yAxisLabel: 'Game',
      axisTickFormatting: formatElapsedTime
    };
  }
}
