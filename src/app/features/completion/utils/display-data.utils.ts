import { combineLatest, Observable } from 'rxjs';

import {
    CompletedDisplayData, MarkCompleteItem, PlayingDisplayData
} from 'features/completion/models';
import { Dictionary, HistoryGrouping, ProgressItem } from 'shared/models';

import { getHistoryListItemMap } from 'shared/utils/history.utils';
import { getCompletedDisplayData } from './completed.utils';
import { getPlayingDisplayData } from './playing.utils';

export const getCompletedDisplayDataItems =
  (progressItems: Observable<ProgressItem[]>, gameGroupings: Observable<HistoryGrouping[]>): Observable<CompletedDisplayData[]> => {
    return combineLatest(progressItems, gameGroupings, (items, groupings) => {
      const historyListItemMap = getHistoryListItemMap(groupings);

      const displayData: CompletedDisplayData[] = [];
      items.forEach(item => {
        const startEntryData = historyListItemMap.get(item.startEntryId);
        const endEntryData = historyListItemMap.get(item.endEntryId);
        if (startEntryData && endEntryData) {
          const displayDataItem = getCompletedDisplayData(item, groupings, startEntryData, endEntryData);
          displayData.push(displayDataItem);
        }
      });
      return displayData.sort((a, b) => b.completedItem.endTime - a.completedItem.endTime);
    });
  };

export const getPlayingDisplayDataItems =
  (progressItems: Observable<ProgressItem[]>,
    gameGroupings: Observable<HistoryGrouping[]>,
    markCompleteEntities: Observable<Dictionary<MarkCompleteItem>>): Observable<PlayingDisplayData[]> => {
    return combineLatest(progressItems, gameGroupings, markCompleteEntities, (items, groupings, entities) => {
      const historyListItemMap = getHistoryListItemMap(groupings);

      const displayData: PlayingDisplayData[] = [];
      items.forEach(item => {
        const startEntryData = historyListItemMap.get(item.startEntryId);
        if (startEntryData) {
          const displayDataItem = getPlayingDisplayData(item, groupings, startEntryData, entities);
          displayData.push(displayDataItem);
        }
      });
      return displayData.sort((a, b) => a.startEntryData.startTime - b.startEntryData.endTime);
    });
  };
