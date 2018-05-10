import { Observable } from 'rxjs/Observable';

import { HistoryGrouping } from '../../tracker/models';
import { GraphDataItem } from '../models';

import { filterGroupingsByDateRange, mapToGraphData, padDateGraphData } from './graph.utils';

export const getPaddedGraphData =
  (groupings: Observable<HistoryGrouping[]>, dateRange: Observable<Date[]>): Observable<GraphDataItem[]> => {
    return groupings.combineLatest(dateRange, (groups, dates) => {
      const groupingsToGraph = filterGroupingsByDateRange(groups, dates);
      const graphItems = mapToGraphData(groupingsToGraph).reverse();
      return padDateGraphData(graphItems, dates);
    });
  };

export const getGraphData =
  (groupings: Observable<HistoryGrouping[]>, dateRange: Observable<Date[]>): Observable<GraphDataItem[]> => {
    return groupings.combineLatest(dateRange, (groups, dates) => {
      const groupingsToGraph = filterGroupingsByDateRange(groups, dates);
      return mapToGraphData(groupingsToGraph);
    });
  };