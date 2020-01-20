import { isSameDay } from 'date-fns';

import { GraphDataItem } from 'features/dashboard/models';
import { DEFAULT_KEY, HistoryGrouping } from 'shared/models';

import { formatDate } from 'shared/utils/date.utils';

export const mapToGraphData = (groupings: HistoryGrouping[]): GraphDataItem[] => {
  return groupings.map(grouping => <GraphDataItem>{
    name: grouping.key === '' ? DEFAULT_KEY : grouping.key,
    value: grouping.totalTime
  });
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

export const sortGraphDataByValue = (items: GraphDataItem[]): GraphDataItem[] => {
  return items.sort((a, b) => b.value - a.value);
};
