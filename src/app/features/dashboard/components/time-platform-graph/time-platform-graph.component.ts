import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { GraphDataItem, PieChartConfig } from '../../models';

@Component({
  selector: 'app-dashboard-time-platform-graph',
  templateUrl: './time-platform-graph.component.html',
  styleUrls: ['./time-platform-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePlatformGraphComponent implements OnInit {

  @Input() config: PieChartConfig;
  @Input() data: GraphDataItem[];
  constructor() { }

  ngOnInit() { }
}
