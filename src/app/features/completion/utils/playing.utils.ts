import { Dictionary, HistoryGrouping, HistoryListItem } from '../../../shared/models';
import { MarkCompleteItem, PlayingDisplayData, PlayingItem, ProgressItem } from '../models';

import { getElapsedTimeFrom } from '../../../shared/utils/history.utils';

export type HistoryListItemMap = Map<string, HistoryListItem>;

export const getHistoryListItemMap = (gameGroupings: HistoryGrouping[]): HistoryListItemMap => {
  const map: HistoryListItemMap = new Map<string, HistoryListItem>();
  gameGroupings.forEach(grouping => {
    grouping.historyItems.forEach(item => {
      map.set(item.id, item);
    });
  });
  return map;
};

export const filterHistoryItemsFrom = (grouping: HistoryGrouping | undefined, startEntry: HistoryListItem): HistoryListItem[] => {
  return grouping ? grouping.historyItems.filter(historyItem =>
    historyItem.platform === startEntry.platform && historyItem.startTime >= startEntry.startTime) : [];
};

export const getPlayingItem = (historyItems: HistoryListItem[], startEntry: HistoryListItem): PlayingItem => {
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
  const filtered = filterHistoryItemsFrom(gameGrouping, startEntryData);
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
