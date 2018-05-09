import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { GraphService } from './services/graph.service';

import dashboardComponentSelectors, { State } from './reducers/root.reducer';

import { BarGraphConfig, DateRangeType, GraphDataItem, PieChartConfig } from './models';

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

  dateRangeType$: Observable<DateRangeType>;
  private barGraphBaseConfig: BarGraphConfig = {
    view: undefined,
    colorScheme: {
      domain: selectColorScheme('cool')
    },
    showLegend: false,
    gradient: false,
    animations: true,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: false,
    showYAxisLabel: false,
    showGridLines: true,
    xAxisLabel: '',
    yAxisLabel: '',
    axisTickFormatting: formatTime,
    scaleMax: 36000
  };
  dateGraphConfig: BarGraphConfig = {
    ...this.barGraphBaseConfig,
    xAxisLabel: 'Date',
    yAxisLabel: 'Total Time Played'
  };
  gameGraphConfig: BarGraphConfig = {
    ...this.barGraphBaseConfig,
    xAxisLabel: 'Total Time Played',
    yAxisLabel: 'Game'
  };
  platformGraphConfig: PieChartConfig = {
    view: undefined,
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

  constructor(private graphService: GraphService, private store: Store<State>) { }

  ngOnInit() {
    this.timeVsDateGraphData$ = this.graphService.getTimeVsDateGraphData();
    this.timeVsPlatformGraphData$ = this.graphService.getTimeVsPlatformGraphData();
    this.timeVsGameGraphData$ = this.graphService.getTimeVsGameGraphData();

    this.isHistoryDataLoading$ = this.graphService.isHistoryDataLoading();
    this.totalTime$ = this.timeVsDateGraphData$.map(x => x.reduce((a, b) => a + b.value, 0));
    this.dateRangeType$ = this.store.select(dashboardComponentSelectors.rangeType);
  }
}
