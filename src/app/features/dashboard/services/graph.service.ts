import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import trackerSelectors, { State as TrackerState } from '../../tracker/reducers/root.reducer';
import dashboardSelectors, { State as DashboardState } from '../reducers/root.reducer';

import { GraphDataItem } from '../models';

import { filterGroupingsByDateRange, mapToGraphData, padDateGraphData } from '../utils/graph.utils';

@Injectable()
export class GraphService {

  private dateRange: Date[] = [];
  constructor(private trackerStore: Store<TrackerState>, private dashboardStore: Store<DashboardState>) { }

  getTimeVsDateGraphData(): Observable<GraphDataItem[]> {
    this.dashboardStore.select(dashboardSelectors.dateList).subscribe(dateList => this.dateRange = dateList);
    const groupingsByDate = this.trackerStore.select(trackerSelectors.historyGroupingsByDate);
    const groupingsToGraph = groupingsByDate.map(grouping => filterGroupingsByDateRange(grouping, this.dateRange));
    return groupingsToGraph.map(groupings => {
      const graphItems = mapToGraphData(groupings).reverse();
      return padDateGraphData(graphItems, this.dateRange);
    });
  }

  getTimeVsPlatformGraphData(): Observable<GraphDataItem[]> {
    this.dashboardStore.select(dashboardSelectors.dateList).subscribe(dateList => this.dateRange = dateList);
    const groupingsByPlatform = this.trackerStore.select(trackerSelectors.historyGroupingsByPlatform);
    const groupingsToGraph = groupingsByPlatform.map(grouping => filterGroupingsByDateRange(grouping, this.dateRange));
    return groupingsToGraph.map(groupings => mapToGraphData(groupings));
  }

  getTimeVsGameGraphData(): Observable<GraphDataItem[]> {
    this.dashboardStore.select(dashboardSelectors.dateList).subscribe(dateList => this.dateRange = dateList);
    const groupingsByGame = this.trackerStore.select(trackerSelectors.historyGroupingsByGame);
    const groupingsToGraph = groupingsByGame.map(grouping => filterGroupingsByDateRange(grouping, this.dateRange));
    return groupingsToGraph.map(groupings => mapToGraphData(groupings));
  }

  isHistoryDataLoading(): Observable<boolean> {
    return this.trackerStore.select(trackerSelectors.historyLoading);
  }
}
