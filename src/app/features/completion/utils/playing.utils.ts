import { Dictionary, HistoryGrouping, HistoryListItem } from '../../../shared/models';
import { MarkCompleteItem, PlayingDisplayData, PlayingItem, ProgressItem } from '../models';

import { filterHistoryItemsAfter } from '../../../shared/utils/history-filter.utils';
import { getElapsedTimeFrom } from '../../../shared/utils/history.utils';

const getPlayingItem = (historyItems: HistoryListItem[], startEntry: HistoryListItem): PlayingItem => {
  const timePlayed = getElapsedTimeFrom(historyItems);
  return {
    game: startEntry.game,
    platform: startEntry.platform,
    startTime: startEntry.startTime,
    timePlayed
  };
};

export const getPlayingDisplayData = (item: ProgressItem,
  gameGroupings: HistoryGrouping[],
  startEntryData: HistoryListItem,
  markCompleteEntities: Dictionary<MarkCompleteItem>): PlayingDisplayData => {
  const gameGrouping = gameGroupings.find(grouping => grouping.key === startEntryData.game);
  const filtered = filterHistoryItemsAfter(gameGrouping, startEntryData);
  const endDates = filtered.map(historyItem => historyItem.endTime);
  const playingItem = getPlayingItem(filtered, startEntryData);
  const markComplete = markCompleteEntities[item.id];

  return {
    item,
    startEntryData,
    playingItem,
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
