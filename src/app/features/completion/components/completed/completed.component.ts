import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { HistoryGrouping, ProgressItem } from '../../../../shared/models';
import { CompletedDisplayData } from '../../models';

import { getHistoryListItemMap } from '../../../../shared/utils/history.utils';
import { getCompletedDisplayData } from '../../utils/completed.utils';

@Component({
  selector: 'app-completion-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedComponent implements OnInit {

  @Input() items: ProgressItem[] = [];
  @Input() gameGroupings: HistoryGrouping[] = [];
  constructor() { }

  ngOnInit() { }

  getDisplayData(): CompletedDisplayData[] {
    const historyListItemMap = getHistoryListItemMap(this.gameGroupings);

    const displayData: CompletedDisplayData[] = [];
    this.items.forEach(item => {
      const startEntryData = historyListItemMap.get(item.startEntryId);
      const endEntryData = historyListItemMap.get(item.endEntryId);
      if (startEntryData && endEntryData) {
        const displayDataItem = getCompletedDisplayData(item, this.gameGroupings, startEntryData, endEntryData);
        displayData.push(displayDataItem);
      }
    });
    return displayData;
  }
}
