import { Observable } from 'rxjs/Observable';

import { HistoryGrouping, HistoryListItem } from '../models';

import { getElapsedTimeInSeconds, isInDateRange } from './date.utils';

type HistoryListItemsMapKeyFunction = (item: HistoryListItem) => string;
type HistoryListItemsMap = Map<string, HistoryListItem[]>;

export const getHistoryListItemsMap = (items: HistoryListItem[], keyFunction: HistoryListItemsMapKeyFunction): HistoryListItemsMap => {
  const map: HistoryListItemsMap = new Map();
  items.forEach((item) => {
    const key = keyFunction(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

export const getHistoryGroupingList = (map: HistoryListItemsMap): HistoryGrouping[] => {
  let groupings: HistoryGrouping[] = [];
  map.forEach((value: HistoryListItem[], key: string) => {
    const elapsedTime = value.map(item => getElapsedTimeInSeconds(item.startTime, item.endTime)).reduce((a, b) => a + b, 0);
    const newGrouping = <HistoryGrouping>{
      key,
      totalTime: elapsedTime,
      historyItems: value
    };
    groupings = [...groupings, newGrouping];
  });
  return groupings;
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

const getFilteredGrouping = (grouping: HistoryGrouping, dateRange: Date[]): HistoryGrouping => {
  const historyItems = grouping.historyItems.filter(item => isInDateRange(item.dateRange[0], dateRange));
  const totalTime = historyItems.map(item => getElapsedTimeInSeconds(item.startTime, item.endTime)).reduce((a, b) => a + b, 0);
  return {
    key: grouping.key,
    totalTime,
    historyItems
  };
};

export const filterGroupingsByDateRangeObservables =
  (groupings: Observable<HistoryGrouping[]>, dateRange: Observable<Date[]>): Observable<HistoryGrouping[]> => {
    return groupings.combineLatest(dateRange, (groups, dates) => {
      return filterGroupingsByDateRange(groups, dates);
    });
  };
