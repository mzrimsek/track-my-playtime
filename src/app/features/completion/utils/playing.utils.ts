import { HistoryGrouping, HistoryListItem } from '../../../shared/models';
import { PlayingDisplayData, PlayingItem, ProgressItem } from '../models';

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

export const filterGameGrouping = (grouping: HistoryGrouping | undefined, startEntry: HistoryListItem): HistoryListItem[] => {
  return grouping ? grouping.historyItems.filter(historyItem =>
    historyItem.platform === startEntry.platform && historyItem.startTime > startEntry.startTime) : [];
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

export const getPlayingDisplayData =
  (item: ProgressItem, gameGroupings: HistoryGrouping[], startEntryData: HistoryListItem): PlayingDisplayData => {
    const gameGrouping = gameGroupings.find(grouping => grouping.key === startEntryData.game);
    const filtered = filterGameGrouping(gameGrouping, startEntryData);
    const endDates = filtered.map(historyItem => historyItem.endTime);
    const playingItem = getPlayingItem(filtered, startEntryData);

    return {
      item,
      startEntryData,
      playingItem,
      endDates
    };
  };
