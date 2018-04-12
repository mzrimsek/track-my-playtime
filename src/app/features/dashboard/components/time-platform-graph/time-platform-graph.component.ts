import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { GraphDataItem, PieChartConfig } from '../../models';

import { selectColorScheme } from '../../utils/colorScheme.utils';

@Component({
  selector: 'app-dashboard-time-platform-graph',
  templateUrl: './time-platform-graph.component.html',
  styleUrls: ['./time-platform-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePlatformGraphComponent implements OnInit {

  @Input() data: GraphDataItem[];
  config: PieChartConfig;
  constructor() {
    this.config = this.getConfig();
  }

  ngOnInit() { }

  getConfig(): PieChartConfig {
    return {
      view: [700, 400],
      colorScheme: {
        domain: selectColorScheme('cool')
      },
      showLegend: false,
      gradient: false,
      animations: true,
      showLabels: true,
      explodeSlices: false,
      doughnut: true
    };
  }
}
