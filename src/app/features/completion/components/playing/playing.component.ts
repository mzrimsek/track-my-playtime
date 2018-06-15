import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { HistoryGrouping, HistoryListItem } from '../../../../shared/models';
import { DisplayPlaying, PlayingItem, ProgressItem } from '../../models';

import { getElapsedTimeFrom } from '../../../../shared/utils/history.utils';

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

  // Move these to a utils file and test it
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
        let timePlayed = 0;
        let endDates: number[] = [];
        const gameGrouping = this.gameGroupings.find(grouping => grouping.key === startEntryData.game);
        if (gameGrouping) {
          const filtered = gameGrouping.historyItems.filter(historyItem =>
            historyItem.platform === startEntryData.platform && historyItem.startTime > startEntryData.startTime);
          endDates = filtered.map(historyItem => historyItem.endTime);
          timePlayed = getElapsedTimeFrom(filtered);
        }
        const playingItem: PlayingItem = {
          game: startEntryData.game,
          platform: startEntryData.platform,
          startTime: startEntryData.startTime,
          timePlayed
        };

        displayData.push({
          item,
          startEntryData,
          playingItem,
          endDates
        });
      }
    });
    return displayData;
  }
}
