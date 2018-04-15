import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import trackerSelectors, { State as TrackerState } from '../../tracker/reducers/root.reducer';

import { GraphDataItem } from '../models';

import { getWeek } from '../../../shared/utils/date.utils';
import { filterGroupingsByDateRange, mapToGraphData, padGraphData } from '../utils/graph.utils';

@Injectable()
export class GraphService {

  private dateRange: Date[] = [];
  constructor(private trackerStore: Store<TrackerState>) {
    this.dateRange = getWeek(new Date());
  }

  getTimeVsDateGraphData(): Observable<GraphDataItem[]> {
    const groupingsByDate = this.trackerStore.select(trackerSelectors.historyGroupingsByDate);
    const groupingsToGraph = groupingsByDate.map(grouping => filterGroupingsByDateRange(grouping, this.dateRange));
    return groupingsToGraph.map(groupings => {
      const graphItems = mapToGraphData(groupings).reverse();
      return padGraphData(graphItems, this.dateRange);
    });
  }

  getTimeVsPlatformGraphData(): Observable<GraphDataItem[]> {
    const groupingsByPlatform = this.trackerStore.select(trackerSelectors.historyGroupingsByPlatform);
    const groupingsToGraph = groupingsByPlatform.map(grouping => filterGroupingsByDateRange(grouping, this.dateRange));
    return groupingsToGraph.map(groupings => mapToGraphData(groupings));
  }

  getTimeVsGameGraphData(): Observable<GraphDataItem[]> {
    const groupingsByGame = this.trackerStore.select(trackerSelectors.historyGroupingsByGame);
    const groupingsToGraph = groupingsByGame.map(grouping => filterGroupingsByDateRange(grouping, this.dateRange));
    return groupingsToGraph.map(groupings => mapToGraphData(groupings));
  }

  isHistoryDataLoading(): Observable<boolean> {
    return this.trackerStore.select(trackerSelectors.historyLoading);
  }
}
