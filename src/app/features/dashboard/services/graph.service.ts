import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import trackerSelectors, { State as TrackerState } from '../../tracker/reducers/root.reducer';

import { GraphDataItem } from '../models';

import { mapToGraphData } from '../utils/graph.utils';

@Injectable()
export class GraphService {

  constructor(private trackerStore: Store<TrackerState>) { }

  getTimeVsDateGraphData(): Observable<GraphDataItem[]> {
    const groupingsByDate = this.trackerStore.select(trackerSelectors.historyGroupingsByDate);
    return groupingsByDate.map(groupings =>
      mapToGraphData(groupings).reverse()
    );
  }

  getTimeVsPlatformGraphData(): Observable<GraphDataItem[]> {
    const groupingsByPlatform = this.trackerStore.select(trackerSelectors.historyGroupingsByPlatform);
    return groupingsByPlatform.map(groupings => mapToGraphData(groupings));
  }

  getTimeVsGameGraphData(): Observable<GraphDataItem[]> {
    const groupingsByGame = this.trackerStore.select(trackerSelectors.historyGroupingsByGame);
    return groupingsByGame.map(groupings => mapToGraphData(groupings));
  }

  isHistoryDataLoading(): Observable<boolean> {
    return this.trackerStore.select(trackerSelectors.historyLoading);
  }
}
