import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Dictionary, HistoryGrouping, ProgressItem } from '../../../../shared/models';
import { MarkCompleteItem, PlayingDisplayData } from '../../models';

import { getHistoryListItemMap } from '../../../../shared/utils/history.utils';
import { getPlayingDisplayData } from '../../utils/playing.utils';

@Component({
  selector: 'app-completion-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayingComponent implements OnInit {

  @Input() items: ProgressItem[] = [];
  @Input() gameGroupings: HistoryGrouping[] = [];
  @Input() markCompleteEntities: Dictionary<MarkCompleteItem>;
  constructor() { }

  ngOnInit() { }

  getDisplayData() {
    const historyListItemMap = getHistoryListItemMap(this.gameGroupings);

    const displayData: PlayingDisplayData[] = [];
    this.items.forEach(item => {
      const startEntryData = historyListItemMap.get(item.startEntryId);
      if (startEntryData) {
        const displayDataItem = getPlayingDisplayData(item, this.gameGroupings, startEntryData, this.markCompleteEntities);
        displayData.push(displayDataItem);
      }
    });
    return displayData;
  }
}
