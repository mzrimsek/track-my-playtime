import { HistoryGrouping } from '../../tracker/models';
import { GraphDataItem } from '../models';

export const DEFAULT_KEY = 'Unassigned';

export const mapToGraphData = (groupings: HistoryGrouping[]): GraphDataItem[] => {
  return groupings.map(grouping => <GraphDataItem>{
    name: grouping.key === '' ? DEFAULT_KEY : grouping.key,
    value: grouping.totalTime
  });
};
