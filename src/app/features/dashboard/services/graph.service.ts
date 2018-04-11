import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { TrackerService } from '../../tracker/services/tracker.service';

import { GraphDataItem } from '../models';

@Injectable()
export class GraphService {

  constructor(private trackerService: TrackerService) { }

  getTimeVsDateGraphData(): Observable<GraphDataItem[]> {
    return this.trackerService.getHistoryGroupingsByDate()
      .map(groupings =>
        groupings.map(grouping => <GraphDataItem>{
          name: grouping.key,
          value: grouping.totalTime
        }).reverse()
      );
  }

  getTimeVsPlatformGraphData(): Observable<GraphDataItem[]> {
    return this.trackerService.getHistoryGroupingsByPlatform()
      .map(groupings =>
        groupings.map(grouping => <GraphDataItem>{
          name: grouping.key,
          value: grouping.totalTime
        })
      );
  }

  getTimeVsGameGraphData(): Observable<GraphDataItem[]> {
    return this.trackerService.getHistoryGroupingsByGame()
      .map(groupings =>
        groupings.map(grouping => <GraphDataItem>{
          name: grouping.key,
          value: grouping.totalTime
        }).sort((a, b) => b.value - a.value)
      );
  }

  isHistoryDataLoading(): Observable<boolean> {
    return this.trackerService.isHistoryDataLoading();
  }
}
