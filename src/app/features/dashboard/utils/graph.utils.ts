import { isSameDay } from 'date-fns';

import { HistoryGrouping } from '../../tracker/models';
import { GraphDataItem } from '../models';

import {
    formatDate, getElapsedTimeInSeconds, isInDateRange
} from '../../../shared/utils/date.utils';

export const DEFAULT_KEY = 'Unassigned';

export const mapToGraphData = (groupings: HistoryGrouping[]): GraphDataItem[] => {
  return groupings.map(grouping => <GraphDataItem>{
    name: grouping.key === '' ? DEFAULT_KEY : grouping.key,
    value: grouping.totalTime
  });
};

export const filterGroupingsByDateRange = (groupings: HistoryGrouping[], dateRange: Date[]): HistoryGrouping[] => {
  const groupingsToGraph: HistoryGrouping[] = [];

  groupings.forEach(grouping => {
    const itemsInDateRange = grouping.historyItems.some(item => isInDateRange(item.dateRange[0], dateRange));
    if (itemsInDateRange) {
      const historyItems = grouping.historyItems.filter(item => isInDateRange(item.dateRange[0], dateRange));
      grouping.historyItems = historyItems;
      grouping.totalTime = historyItems.map(item => getElapsedTimeInSeconds(item.startTime, item.endTime)).reduce((a, b) => a + b, 0);
      groupingsToGraph.push(grouping);
    }
  });
  return groupingsToGraph;
};

export const padGraphData = (graphItems: GraphDataItem[], dateRange: Date[]): GraphDataItem[] => {
  const paddedGraphItems: GraphDataItem[] = [];

  for (let i = 0; i < dateRange.length; i++) {
    let inRange = false;

    for (let j = 0; j < graphItems.length; j++) {
      const itemDate = new Date(graphItems[j].name);
      if (isSameDay(dateRange[i], itemDate)) {
        inRange = true;
        paddedGraphItems.push(graphItems[j]);
        break;
      }
    }

    if (!inRange) {
      paddedGraphItems.push({
        name: formatDate(dateRange[i]),
        value: 0
      });
    }
  }

  return paddedGraphItems;
};
