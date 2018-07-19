import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import sharedSelectors, { State as SharedState } from '../../shared/reducers/root.reducer';
import dashboardSelectors, { State as DashboardState } from './reducers/root.reducer';

import {
    BarGraphConfig, DateRangeType, GraphConfig, GraphDataItem, PieChartConfig
} from './models';

import { formatTime } from '../../shared/utils/date.utils';
import { selectColorScheme } from './utils/colorScheme.utils';
import { getGraphData, getPaddedGraphData, getSortedGraphData } from './utils/graph-data.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  timeVsDateGraphData$: Observable<GraphDataItem[]>;
  timeVsPlatformGraphData$: Observable<GraphDataItem[]>;
  timeVsGameGraphData$: Observable<GraphDataItem[]>;

  totalTime$: Observable<number>;

  dateRangeType$: Observable<DateRangeType>;

  private graphConfig: GraphConfig = {
    view: undefined,
    colorScheme: {
      domain: selectColorScheme('cool')
    },
    showLegend: false,
    gradient: false,
    animations: true,
  };
  private barGraphBaseConfig: BarGraphConfig = {
    ...this.graphConfig,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: false,
    showYAxisLabel: false,
    showGridLines: true,
    xAxisLabel: '',
    yAxisLabel: '',
    axisTickFormatting: formatTime,
    scaleMax: 3600 * 10
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
    ...this.graphConfig,
    showLabels: true,
    explodeSlices: false,
    doughnut: true
  };
  constructor(private sharedStore: Store<SharedState>, private dashboardStore: Store<DashboardState>) { }

  ngOnInit() {
    const dateList = this.dashboardStore.select(dashboardSelectors.dateList);
    const groupingsByDate = this.sharedStore.select(sharedSelectors.historyGroupingsByDate);
    const groupingsByPlatform = this.sharedStore.select(sharedSelectors.historyGroupingsByPlatform);
    const groupingsByGame = this.sharedStore.select(sharedSelectors.historyGroupingsByGame);

    this.timeVsDateGraphData$ = getPaddedGraphData(groupingsByDate, dateList);
    this.timeVsPlatformGraphData$ = getGraphData(groupingsByPlatform, dateList);
    this.timeVsGameGraphData$ = getSortedGraphData(groupingsByGame, dateList);

    this.totalTime$ = this.timeVsDateGraphData$.map(x => x.reduce((a, b) => a + b.value, 0));
    this.dateRangeType$ = this.dashboardStore.select(dashboardSelectors.rangeType);
  }
}
