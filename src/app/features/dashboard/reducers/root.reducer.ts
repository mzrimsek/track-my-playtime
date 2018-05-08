import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { eachDay } from 'date-fns';

import * as fromDateRange from './date-range.reducer';

interface DashboardState {
  dateRange: fromDateRange.State;
}

export interface State {
  dashboard: DashboardState;
}

export const reducers: ActionReducerMap<DashboardState> = {
  dateRange: fromDateRange.reducer
};

export const _selectDashboardFeature = createFeatureSelector<DashboardState>('dashboard');
export const _selectDateRange = createSelector(_selectDashboardFeature, state => state.dateRange);

export const _selectDateList = createSelector(_selectDateRange, dateRange => {
  return eachDay(dateRange.startDay, dateRange.endDay);
});

const dashboardComponentSelectors = {
  dateList: _selectDateList
};

export default dashboardComponentSelectors;