import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { BarGraphConfig, GraphDataItem } from '../../models';

@Component({
  selector: 'app-dashboard-time-game-graph',
  templateUrl: './time-game-graph.component.html',
  styleUrls: ['./time-game-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeGameGraphComponent implements OnInit {

  @Input() config: BarGraphConfig;
  @Input() data: GraphDataItem[];
  constructor() { }

  ngOnInit() { }
}
