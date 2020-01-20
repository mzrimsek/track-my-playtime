import { HistoryGrouping, HistoryListItem } from 'shared/models';

import { getElapsedTimeInSeconds, isInDateRange } from './date.utils';

export type HistoryListItemKeyFunction = (item: HistoryListItem) => string;
export type HistoryListItemsMap = Map<string, HistoryListItem[]>;
export type HistoryListItemMap = Map<string, HistoryListItem>;

export const getHistoryListItemsMap = (items: HistoryListItem[], keyFunction: HistoryListItemKeyFunction): HistoryListItemsMap => {
  const map: HistoryListItemsMap = new Map<string, HistoryListItem[]>();
  items.forEach((item) => {
    const key = keyFunction(item);
    const collection = map.get(key);
    if (collection) {
      collection.push(item);
    } else {
      map.set(key, [item]);
    }
  });
  return map;
};

export const getElapsedTimeFrom = (items: HistoryListItem[]): number => {
  return items.map(item => getElapsedTimeInSeconds(item.startTime, item.endTime)).reduce((a, b) => a + b, 0);
};

export const getHistoryGroupingList = (map: HistoryListItemsMap): HistoryGrouping[] => {
  let groupings: HistoryGrouping[] = [];
  map.forEach((value: HistoryListItem[], key: string) => {
    const newGrouping = <HistoryGrouping>{
      key,
      totalTime: getElapsedTimeFrom(value),
      historyItems: value
    };
    groupings = [...groupings, newGrouping];
  });
  return groupings;
};

export const getFilteredGrouping = (grouping: HistoryGrouping, dateRange: Date[]): HistoryGrouping => {
  const historyItems = grouping.historyItems.filter(item => isInDateRange(item.dateRange[0], dateRange));
  const totalTime = historyItems.map(item => getElapsedTimeInSeconds(item.startTime, item.endTime)).reduce((a, b) => a + b, 0);
  return {
    key: grouping.key,
    totalTime,
    historyItems
  };
};

export const filterGroupingsByDateRange = (groupings: HistoryGrouping[], dateRange: Date[]): HistoryGrouping[] => {
  const groupingsToGraph: HistoryGrouping[] = [];
  groupings.forEach(grouping => {
    const groupingHasHistoryItemInRange = grouping.historyItems.some(item => isInDateRange(item.dateRange[0], dateRange));
    if (groupingHasHistoryItemInRange) {
      const filtedGrouping = getFilteredGrouping(grouping, dateRange);
      groupingsToGraph.push(filtedGrouping);
    }
  });
  return groupingsToGraph;
};

export const getHistoryListItemMap = (gameGroupings: HistoryGrouping[]): HistoryListItemMap => {
  const map: HistoryListItemMap = new Map<string, HistoryListItem>();
  gameGroupings.forEach(grouping => {
    grouping.historyItems.forEach(item => {
      map.set(item.id, item);
    });
  });
  return map;
};
