import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { isSameDay } from 'date-fns';
import { Observable } from 'rxjs/Observable';

import trackerSelectors, { State as TrackerState } from '../../tracker/reducers/root.reducer';

import { GraphDataItem } from '../models';

import { formatDate, getWeek } from '../../../shared/utils/date.utils';
import { getGroupingsToGraph, mapToGraphData } from '../utils/graph.utils';

@Injectable()
export class GraphService {

  private dateRange: Date[] = [];
  constructor(private trackerStore: Store<TrackerState>) {
    this.dateRange = getWeek(new Date());
  }

  getTimeVsDateGraphData(): Observable<GraphDataItem[]> {
    const groupingsByDate = this.trackerStore.select(trackerSelectors.historyGroupingsByDate);
    const groupingsToGraph = groupingsByDate.map(grouping => getGroupingsToGraph(grouping, this.dateRange));
    return groupingsToGraph.map(groupings => {
      const graphItems = mapToGraphData(groupings).reverse();
      const realGraphItems: GraphDataItem[] = [];

      // if none of the graph data points have the current date, push a new item to the list else push that item to the list
      for (let i = 0; i < this.dateRange.length; i++) {
        let isInDateRange = false;

        for (let j = 0; j < graphItems.length; j++) {
          const itemDate = new Date(graphItems[j].name);
          if (isSameDay(this.dateRange[i], itemDate)) {
            isInDateRange = true;
            realGraphItems.push(graphItems[j]);
            break;
          }
        }

        if (!isInDateRange) {
          realGraphItems.push({
            name: formatDate(this.dateRange[i]),
            value: 0
          });
        }
      }

      return realGraphItems;
    });
  }

  getTimeVsPlatformGraphData(): Observable<GraphDataItem[]> {
    const groupingsByPlatform = this.trackerStore.select(trackerSelectors.historyGroupingsByPlatform);
    const groupingsToGraph = groupingsByPlatform.map(grouping => getGroupingsToGraph(grouping, this.dateRange));
    return groupingsToGraph.map(groupings => mapToGraphData(groupings));
  }

  getTimeVsGameGraphData(): Observable<GraphDataItem[]> {
    const groupingsByGame = this.trackerStore.select(trackerSelectors.historyGroupingsByGame);
    const groupingsToGraph = groupingsByGame.map(grouping => getGroupingsToGraph(grouping, this.dateRange));
    return groupingsToGraph.map(groupings => mapToGraphData(groupings));
  }

  isHistoryDataLoading(): Observable<boolean> {
    return this.trackerStore.select(trackerSelectors.historyLoading);
  }
}
