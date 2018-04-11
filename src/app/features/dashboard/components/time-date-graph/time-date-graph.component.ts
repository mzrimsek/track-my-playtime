import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { BarGraphConfig, GraphDataItem } from '../../models';

import { formatElapsedTime } from '../../../../shared/utils/date.utils';
import { selectColorScheme } from '../../utils/colorScheme.utils';

@Component({
  selector: 'app-dashboard-time-date-graph',
  templateUrl: './time-date-graph.component.html',
  styleUrls: ['./time-date-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeDateGraphComponent implements OnInit {

  @Input() data: GraphDataItem[];
  config: BarGraphConfig;
  constructor() {
    this.config = this.getConfig();
  }

  ngOnInit() { }

  getConfig(): BarGraphConfig {
    return {
      view: [700, 400],
      colorScheme: {
        domain: selectColorScheme('cool')
      },
      showLegend: false,
      gradient: false,
      animations: false,
      showXAxis: true,
      showYAxis: true,
      showXAxisLabel: true,
      showYAxisLabel: true,
      showGridLines: true,
      xAxisLabel: 'Date',
      yAxisLabel: 'Total Time Played',
      axisTickFormatting: formatElapsedTime
    };
  }
}
