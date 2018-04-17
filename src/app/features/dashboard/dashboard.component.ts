import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { GraphService } from './services/graph.service';

import { BarGraphConfig, GraphDataItem, PieChartConfig } from './models';

import { formatTime } from '../../shared/utils/date.utils';
import { selectColorScheme } from './utils/colorScheme.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  timeVsDateGraphData$: Observable<GraphDataItem[]>;
  timeVsPlatformGraphData$: Observable<GraphDataItem[]>;
  timeVsGameGraphData$: Observable<GraphDataItem[]>;
  isHistoryDataLoading$: Observable<boolean>;
  totalTime$: Observable<number>;

  dateGraphConfig: BarGraphConfig = {
    view: [700, 400],
    colorScheme: {
      domain: selectColorScheme('cool')
    },
    showLegend: false,
    gradient: false,
    animations: true,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    showGridLines: true,
    xAxisLabel: 'Date',
    yAxisLabel: 'Total Time Played',
    axisTickFormatting: formatTime
  };
  gameGraphConfig: BarGraphConfig = {
    view: [700, 400],
    colorScheme: {
      domain: selectColorScheme('cool')
    },
    showLegend: false,
    gradient: false,
    animations: true,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    showGridLines: true,
    xAxisLabel: 'Total Time Played',
    yAxisLabel: 'Game',
    axisTickFormatting: formatTime
  };
  platformGraphConfig: PieChartConfig = {
    view: [700, 400],
    colorScheme: {
      domain: selectColorScheme('cool')
    },
    showLegend: false,
    gradient: false,
    animations: true,
    showLabels: true,
    explodeSlices: false,
    doughnut: true
  };
  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.timeVsDateGraphData$ = this.graphService.getTimeVsDateGraphData();
    this.timeVsPlatformGraphData$ = this.graphService.getTimeVsPlatformGraphData();
    this.timeVsGameGraphData$ = this.graphService.getTimeVsGameGraphData();
    this.isHistoryDataLoading$ = this.graphService.isHistoryDataLoading();
    this.totalTime$ = this.timeVsDateGraphData$.map(x => x.reduce((a, b) => a + b.value, 0));
  }
}
