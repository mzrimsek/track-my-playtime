import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { GraphDataItem } from '../../models';

@Component({
  selector: 'app-dashboard-graph-tooltip',
  templateUrl: './graph-tooltip.component.html',
  styleUrls: ['./graph-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphTooltipComponent implements OnInit {

  @Input() model: GraphDataItem;
  constructor() { }

  ngOnInit() { }
}
