import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { GraphService } from './services/graph.service';

import { BarGraphDataItem } from './models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  timeVsDateGraphData$: Observable<BarGraphDataItem[]>;
  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.timeVsDateGraphData$ = this.graphService.getTimeVsDateGraphData();
  }
}
