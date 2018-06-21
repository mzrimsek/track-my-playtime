import { HistoryGrouping, HistoryListItem } from '../../../shared/models';
import { CompletedDisplayData, CompletedItem, ProgressItem } from '../models';

import { filterHistoryItemsBetween } from '../../../shared/utils/history-filter.utils';
import { getElapsedTimeFrom } from '../../../shared/utils/history.utils';

const getCompletedItem = (historyItems: HistoryListItem[], startEntry: HistoryListItem, endEntry: HistoryListItem): CompletedItem => {
  const timePlayed = getElapsedTimeFrom(historyItems);
  return {
    game: startEntry.game,
    platform: startEntry.platform,
    startTime: startEntry.startTime,
    endTime: endEntry.endTime,
    timePlayed
  };
};

export const getCompletedDisplayData =
  (item: ProgressItem,
    gameGroupings: HistoryGrouping[],
    startEntryData: HistoryListItem,
    endEntryData: HistoryListItem): CompletedDisplayData => {
    const gameGrouping = gameGroupings.find(grouping => grouping.key === startEntryData.game);
    const filtered = filterHistoryItemsBetween(gameGrouping, startEntryData, endEntryData);
    const completedItem = getCompletedItem(filtered, startEntryData, endEntryData);

    return {
      item,
      completedItem
    };
  };
