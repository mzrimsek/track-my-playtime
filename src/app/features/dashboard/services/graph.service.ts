import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { TrackerService } from '../../tracker/services/tracker.service';

import { BarGraphDataItem } from '../models';

@Injectable()
export class GraphService {

  constructor(private trackerService: TrackerService) { }

  getTimeVsDateGraphData(): Observable<BarGraphDataItem[]> {
    return this.trackerService.getHistoryGroupingsByDate()
      .map(groupings =>
        groupings.map(grouping => <BarGraphDataItem>{
          name: grouping.key,
          value: grouping.totalTime
        }).reverse()
      );
  }
}
