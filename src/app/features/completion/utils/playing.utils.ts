import { Dictionary, HistoryGrouping, HistoryListItem, ProgressItem } from '../../../shared/models';
import { MarkCompleteItem, PlayingDisplayData } from '../models';

import { filterHistoryItemsAfter } from '../../../shared/utils/history-filter.utils';
import { getElapsedTimeFrom } from '../../../shared/utils/history.utils';

export const getPlayingDisplayData = (item: ProgressItem,
  gameGroupings: HistoryGrouping[],
  startEntryData: HistoryListItem,
  markCompleteEntities: Dictionary<MarkCompleteItem>): PlayingDisplayData => {
  const gameGrouping = gameGroupings.find(grouping => grouping.key === startEntryData.game);
  const filtered = filterHistoryItemsAfter(gameGrouping, startEntryData);
  const endDates = filtered.map(historyItem => historyItem.endTime);
  const timePlayed = getElapsedTimeFrom(filtered);
  const markComplete = markCompleteEntities[item.id];

  return {
    item,
    startEntryData,
    timePlayed,
    endDates,
    markComplete
  };
};

export const getEndItem = (gameGroupings: HistoryGrouping[], startItem: HistoryListItem, endTime: number): HistoryListItem | undefined => {
  const gameGrouping = gameGroupings.find(grouping => grouping.key === startItem.game);
  return gameGrouping ? gameGrouping.historyItems.find(item =>
    item.game === startItem.game &&
    item.platform === startItem.platform &&
    item.endTime === endTime) : undefined;
};
