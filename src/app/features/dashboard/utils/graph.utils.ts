import { HistoryGrouping } from '../../tracker/models';
import { GraphDataItem } from '../models';

import { isInDateRange } from '../../../shared/utils/date.utils';


export const DEFAULT_KEY = 'Unassigned';

export const mapToGraphData = (groupings: HistoryGrouping[]): GraphDataItem[] => {
  return groupings.map(grouping => <GraphDataItem>{
    name: grouping.key === '' ? DEFAULT_KEY : grouping.key,
    value: grouping.totalTime
  });
};

export const getGroupingsToGraph = (groupings: HistoryGrouping[], dateRange: Date[]): HistoryGrouping[] => {
  const groupingsToGraph: HistoryGrouping[] = [];

  groupings.forEach(grouping => {
    const firstDate = grouping.historyItems[0].dateRange[0];
    if (isInDateRange(firstDate, dateRange)) {
      groupingsToGraph.push(grouping);
    }
  });
  return groupingsToGraph;
};
