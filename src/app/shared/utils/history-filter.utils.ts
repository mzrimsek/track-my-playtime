import { HistoryGrouping, HistoryListItem } from 'shared/models';

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

export const filterHistoryItemsAfter = (grouping: HistoryGrouping | undefined, startEntry: HistoryListItem): HistoryListItem[] => {
  return grouping ? grouping.historyItems.filter(historyItem =>
    historyItem.platform === startEntry.platform && historyItem.startTime >= startEntry.startTime) : [];
};

export const filterHistoryItemsBetween =
  (grouping: HistoryGrouping | undefined, startEntry: HistoryListItem, endEntry: HistoryListItem): HistoryListItem[] => {
    const filtered = filterHistoryItemsAfter(grouping, startEntry);
    return filtered.filter(item => item.endTime <= endEntry.endTime);
  };
