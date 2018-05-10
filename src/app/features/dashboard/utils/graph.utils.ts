import { isSameDay } from 'date-fns';

import { HistoryGrouping } from '../../../shared/models';
import { GraphDataItem } from '../models';

import {
    formatDate, getElapsedTimeInSeconds, isInDateRange
} from '../../../shared/utils/date.utils';

export const DEFAULT_KEY = 'Uncategorized';

export const mapToGraphData = (groupings: HistoryGrouping[]): GraphDataItem[] => {
  return groupings.map(grouping => <GraphDataItem>{
    name: grouping.key === '' ? DEFAULT_KEY : grouping.key,
    value: grouping.totalTime
  });
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

export const padDateGraphData = (graphItems: GraphDataItem[], dateRange: Date[]): GraphDataItem[] => {
  const paddedGraphItems: GraphDataItem[] = [];
  for (let i = 0; i < dateRange.length; i++) {
    let itemToAdd = getGraphDataItemIfInRange(graphItems, dateRange[i]);

    if (!itemToAdd) {
      itemToAdd = {
        name: formatDate(dateRange[i]),
        value: 0
      };
    }
    paddedGraphItems.push(itemToAdd);
  }
  return paddedGraphItems;
};

const getGraphDataItemIfInRange = (items: GraphDataItem[], rangeDate: Date): GraphDataItem | undefined => {
  for (let i = 0; i < items.length; i++) {
    const itemDate = new Date(items[i].name);
    if (isSameDay(rangeDate, itemDate)) {
      return items[i];
    }
  }
  return undefined;
};
