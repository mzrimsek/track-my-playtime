import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GraphDataItem, PieChartConfig } from 'features/dashboard/models';

@Component({
  selector: 'app-dashboard-time-platform-graph',
  templateUrl: './time-platform-graph.component.html',
  styleUrls: ['./time-platform-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePlatformGraphComponent {

  @Input() data: GraphDataItem[];
  @Input() config: PieChartConfig;
}
