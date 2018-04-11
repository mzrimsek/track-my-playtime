import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { GraphService } from './services/graph.service';

import { GraphDataItem } from './models';

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
  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.timeVsDateGraphData$ = this.graphService.getTimeVsDateGraphData();
    this.timeVsPlatformGraphData$ = this.graphService.getTimeVsPlatformGraphData();
    this.timeVsGameGraphData$ = this.graphService.getTimeVsGameGraphData();
    this.isHistoryDataLoading$ = this.graphService.isHistoryDataLoading();
  }
}
