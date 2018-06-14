import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { HistoryGrouping } from '../../../../shared/models';
import { DisplayPlaying, Playing } from '../../models';

@Component({
  selector: 'app-completion-playing-item',
  templateUrl: './playing-item.component.html',
  styleUrls: ['./playing-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayingItemComponent implements OnInit {

  @Input() displayData: DisplayPlaying;
  @Input() gameGroupings: HistoryGrouping[] = [];
  constructor() { }

  ngOnInit() { }

  getPlaying(): Playing {
    return {
      game: this.displayData.startEntryData.game,
      platform: this.displayData.startEntryData.platform,
      startTime: this.displayData.startEntryData.startTime,
      timePlayed: 0 // need to calculate this based on the last time it was tracked...maybe pass it in?
    };
  }
}
