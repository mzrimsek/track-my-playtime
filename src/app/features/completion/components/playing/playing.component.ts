import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { HistoryGrouping, HistoryListItem } from '../../../../shared/models';
import { DisplayPlaying, ProgressItem } from '../../models';

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

  // Move this to a utils file and test it
  getDisplayData() {
    const historyListItemMap = new Map<string, HistoryListItem>();
    this.gameGroupings.forEach(grouping => {
      grouping.historyItems.forEach(item => {
        historyListItemMap.set(item.id, item);
      });
    });

    const displayData: DisplayPlaying[] = [];
    this.items.forEach(item => {
      const startEntryData = historyListItemMap.get(item.startEntryId);
      if (startEntryData) {
        displayData.push({
          item,
          startEntryData
        });
      }
    });

    return displayData;
  }
}
