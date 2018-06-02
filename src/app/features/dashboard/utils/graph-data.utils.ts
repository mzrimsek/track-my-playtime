import { Observable } from 'rxjs/Observable';

import { HistoryGrouping } from '../../../shared/models';
import { GraphDataItem } from '../models';

import { filterGroupingsByDateRange } from '../../../shared/utils/history.utils';
import { mapToGraphData, padDateGraphData, sortGraphDataByValue } from './graph.utils';

type GraphDataModifier = (items: GraphDataItem[], dates: Date[]) => GraphDataItem[];

export const getGraphData =
  (groupings: Observable<HistoryGrouping[]>,
    dateRange: Observable<Date[]>,
    modifier: GraphDataModifier = x => x): Observable<GraphDataItem[]> => {
    return groupings.combineLatest(dateRange, (groups, dates) => {
      const groupingsToGraph = filterGroupingsByDateRange(groups, dates);
      const graphItems = mapToGraphData(groupingsToGraph);
      return modifier(graphItems, dates);
    });
  };

export const getPaddedGraphData =
  (groupings: Observable<HistoryGrouping[]>, dateRange: Observable<Date[]>): Observable<GraphDataItem[]> => {
    const modifier: GraphDataModifier = (items, dates) => {
      const reversed = items.reverse();
      return padDateGraphData(reversed, dates);
    };
    return getGraphData(groupings, dateRange, modifier);
  };

export const getSortedGraphData =
  (groupings: Observable<HistoryGrouping[]>, dateRange: Observable<Date[]>): Observable<GraphDataItem[]> => {
    return getGraphData(groupings, dateRange, sortGraphDataByValue);
  };
