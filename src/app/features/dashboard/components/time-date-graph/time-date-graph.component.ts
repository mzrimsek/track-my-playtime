import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BarGraphConfig, GraphDataItem } from '../../models';

@Component({
  selector: 'app-dashboard-time-date-graph',
  templateUrl: './time-date-graph.component.html',
  styleUrls: ['./time-date-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeDateGraphComponent {

  @Input() data: GraphDataItem[];
  @Input() config: BarGraphConfig;
}
