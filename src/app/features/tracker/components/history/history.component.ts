import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { HistoryGrouping } from 'shared/models';

@Component({
  selector: 'app-tracker-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent {

  @Input() groups: HistoryGrouping[] = [];
  @Input() platformsOptions: string[] = [];
  @Input() trackedGames: string[] = [];
}
