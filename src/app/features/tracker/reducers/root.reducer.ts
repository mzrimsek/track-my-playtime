import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromDisplay from './display.reducer';

export interface TrackerState {
  display: fromDisplay.State;
}

export interface State {
  tracker: TrackerState;
}

export const reducers: ActionReducerMap<TrackerState, any> = {
  display: fromDisplay.reducer
};

export const _selectTrackerState = createFeatureSelector<TrackerState>('tracker');
export const _selectDisplay = createSelector(_selectTrackerState, state => state.display);

export const _selectEntriesToShow = createSelector(_selectDisplay, display => display.entriesToShow);

const trackerSelectors = {
  entriesToShow: _selectEntriesToShow
};

export default trackerSelectors;
