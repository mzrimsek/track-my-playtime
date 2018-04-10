import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { GraphService } from './services/graph.service';

import { BarGraphDataItem } from './models';

import { formatElapsedTime } from '../../shared/utils/date.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Total Time Played';
  yAxisTickFormatting = formatElapsedTime;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  timeVsDateGraphData$: Observable<BarGraphDataItem[]>;
  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.timeVsDateGraphData$ = this.graphService.getTimeVsDateGraphData();
  }
}
