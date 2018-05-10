import { Observable } from 'rxjs/Observable';

import { HistoryGrouping } from '../../../shared/models';
import { GraphDataItem } from '../models';

import {
    filterGroupingsByDateRange, filterGroupingsByDateRangeObservables
} from '../../../shared/utils/history.utils';
import { mapToGraphData, padDateGraphData } from './graph.utils';

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
    const filteredGroupings = filterGroupingsByDateRangeObservables(groupings, dateRange);
    return filteredGroupings.map(filtered => mapToGraphData(filtered));
  };
