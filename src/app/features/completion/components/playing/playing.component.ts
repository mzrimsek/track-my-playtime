import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { HistoryGrouping } from '../../../../shared/models';
import { PlayingDisplayData, ProgressItem } from '../../models';

import { getHistoryListItemMap, getPlayingDisplayData } from '../../utils/playing.utils';

@Component({
  selector: 'app-completion-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayingComponent implements OnInit {

  @Input() items: ProgressItem[] = [];
  @Input() gameGroupings: HistoryGrouping[] = [];
  constructor() { }

  ngOnInit() { }

  getDisplayData() {
    const historyListItemMap = getHistoryListItemMap(this.gameGroupings);

    const displayData: PlayingDisplayData[] = [];
    this.items.forEach(item => {
      const startEntryData = historyListItemMap.get(item.startEntryId);
      if (startEntryData) {
        const displayDataItem = getPlayingDisplayData(item, this.gameGroupings, startEntryData);
        if (displayDataItem) {
          displayData.push(displayDataItem);
        }
      }
    });
    return displayData;
  }
}
