import { HistoryGrouping, HistoryListItem } from '../models';

import { HistoryListItemKeyFunction } from './history.utils';

export const getUniqueFrom = (items: HistoryListItem[], keyFunction: HistoryListItemKeyFunction): string[] => {
  const data = items.map(keyFunction);
  return Array.from(new Set(data));
};

export const filterPlatforms = (groupings: HistoryGrouping[], game: string | null): string[] => {
  const selectedGameGrouping = groupings.find(grouping => grouping.key === game);
  return selectedGameGrouping ? getUniqueFrom(selectedGameGrouping.historyItems, item => item.platform) : [];
};

export const filterStartTimes = (groupings: HistoryGrouping[], game: string | null, platform: string): number[] => {
  const selectedGameGrouping = groupings.find(grouping => grouping.key === game);
  return selectedGameGrouping ? selectedGameGrouping.historyItems
    .filter(item => item.platform === platform)
    .map(item => item.startTime).reverse() : [];
};

export const filterEndTimes = (groupings: HistoryGrouping[], startItem: HistoryListItem): number[] => {
  const selectedGameGrouping = groupings.find(grouping => grouping.key === startItem.game);
  return selectedGameGrouping ? selectedGameGrouping.historyItems
    .filter(item => item.platform === startItem.platform && item.startTime > startItem.startTime)
    .map(item => item.endTime).reverse() : [];
};

export const filterHistoryItemsFrom = (grouping: HistoryGrouping | undefined, startEntry: HistoryListItem): HistoryListItem[] => {
  return grouping ? grouping.historyItems.filter(historyItem =>
    historyItem.platform === startEntry.platform && historyItem.startTime >= startEntry.startTime) : [];
};
