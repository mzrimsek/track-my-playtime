import { HistoryGrouping, HistoryListItem } from '../models';

import { getElapsedTimeInSeconds } from '../../../shared/utils/date.utils';

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

export const getHistoryGroupingsFromHistoryListItemsMap = (map: HistoryListItemsMap): HistoryGrouping[] => {
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
