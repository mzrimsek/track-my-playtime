import { HistoryGrouping } from '../../tracker/models';
import { GraphDataItem } from '../models';

export const mapToGraphData = (groupings: HistoryGrouping[]): GraphDataItem[] => {
  return groupings.map(grouping => <GraphDataItem>{
    name: grouping.key,
    value: grouping.totalTime
  });
};
