import { Observable } from 'rxjs/Observable';

import { HistoryGrouping } from '../../../shared/models';
import { GraphDataItem } from '../models';

import { filterGroupingsByDateRange } from '../../../shared/utils/history.utils';
import { mapToGraphData, padDateGraphData, sortGraphDataByValue } from './graph.utils';

type GraphDataModifier = (items: GraphDataItem[], dates: Date[]) => GraphDataItem[];

export const getPaddedGraphData =
  (groupings: Observable<HistoryGrouping[]>, dateRange: Observable<Date[]>): Observable<GraphDataItem[]> => {
    const modifier: GraphDataModifier = (items: GraphDataItem[], dates: Date[]) => {
      const reversed = items.reverse();
      return padDateGraphData(reversed, dates);
    };
    return processGraphData(groupings, dateRange, modifier);
  };

export const getGraphData =
  (groupings: Observable<HistoryGrouping[]>, dateRange: Observable<Date[]>): Observable<GraphDataItem[]> => {
    return processGraphData(groupings, dateRange, x => x);
  };

export const getSortedGraphData =
  (groupings: Observable<HistoryGrouping[]>, dateRange: Observable<Date[]>): Observable<GraphDataItem[]> => {
    return processGraphData(groupings, dateRange, sortGraphDataByValue);
  };

const processGraphData =
  (groupings: Observable<HistoryGrouping[]>, dateRange: Observable<Date[]>, modifier: GraphDataModifier): Observable<GraphDataItem[]> => {
    return groupings.combineLatest(dateRange, (groups, dates) => {
      const groupingsToGraph = filterGroupingsByDateRange(groups, dates);
      const graphItems = mapToGraphData(groupingsToGraph);
      return modifier(graphItems, dates);
    });
  };
