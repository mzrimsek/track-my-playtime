import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GraphDataItem } from '../../models';

@Component({
  selector: 'app-dashboard-graph-tooltip',
  templateUrl: './graph-tooltip.component.html',
  styleUrls: ['./graph-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphTooltipComponent {

  @Input() model: GraphDataItem;
}
