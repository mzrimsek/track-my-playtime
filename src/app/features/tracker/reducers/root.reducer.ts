import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromDisplay from './display.reducer';
import * as fromTimer from './timer.reducer';

import { TimerInfo } from '../models';

export interface TrackerState {
  timer: fromTimer.State;
  display: fromDisplay.State;
}

export interface State {
  tracker: TrackerState;
}

export const reducers: ActionReducerMap<TrackerState, any> = {
  timer: fromTimer.reducer,
  display: fromDisplay.reducer
};

export const _selectTrackerState = createFeatureSelector<TrackerState>('tracker');
export const _selectTimer = createSelector(_selectTrackerState, state => state.timer);
export const _selectDisplay = createSelector(_selectTrackerState, state => state.display);

export const _selectTimerInfo = createSelector(_selectTimer, timer => timer as TimerInfo);

export const _selectEntriesToShow = createSelector(_selectDisplay, display => display.entriesToShow);

const trackerSelectors = {
  timerInfo: _selectTimerInfo,
  entriesToShow: _selectEntriesToShow
};

export default trackerSelectors;
