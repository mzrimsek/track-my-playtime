import { Observable } from 'rxjs/Observable';

import { Dictionary, HistoryGrouping, ProgressItem } from '../../../shared/models';
import { CompletedDisplayData, MarkCompleteItem, PlayingDisplayData } from '../models';

import { getHistoryListItemMap } from '../../../shared/utils/history.utils';
import { getCompletedDisplayData } from './completed.utils';
import { getPlayingDisplayData } from './playing.utils';

export const getCompletedDisplayDataItems =
  (progressItems: Observable<ProgressItem[]>, gameGroupings: Observable<HistoryGrouping[]>): Observable<CompletedDisplayData[]> => {
    return progressItems.combineLatest(gameGroupings, (items, groupings) => {
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
      return displayData;
    });
  };

export const getPlayingDisplayDataItems =
  (progressItems: Observable<ProgressItem[]>,
    gameGroupings: Observable<HistoryGrouping[]>,
    markCompleteEntities: Observable<Dictionary<MarkCompleteItem>>): Observable<PlayingDisplayData[]> => {
    return progressItems.combineLatest(gameGroupings, markCompleteEntities, (items, groupings, entities) => {
      const historyListItemMap = getHistoryListItemMap(groupings);

      const displayData: PlayingDisplayData[] = [];
      items.forEach(item => {
        const startEntryData = historyListItemMap.get(item.startEntryId);
        if (startEntryData) {
          const displayDataItem = getPlayingDisplayData(item, groupings, startEntryData, entities);
          displayData.push(displayDataItem);
        }
      });
      return displayData;
    });
  };
