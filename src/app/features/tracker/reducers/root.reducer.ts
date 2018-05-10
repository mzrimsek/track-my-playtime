import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { eachDay, subDays } from 'date-fns';

import * as fromDisplay from './display.reducer';
import * as fromPlatforms from './platforms.reducer';
import * as fromTimer from './timer.reducer';

import { TimerInfo } from '../models';

export interface TrackerState {
  timer: fromTimer.State;
  platforms: fromPlatforms.State;
  display: fromDisplay.State;
}

export interface State {
  tracker: TrackerState;
}

export const reducers: ActionReducerMap<TrackerState> = {
  timer: fromTimer.reducer,
  platforms: fromPlatforms.reducer,
  display: fromDisplay.reducer
};

export const _selectTrackerState = createFeatureSelector<TrackerState>('tracker');
export const _selectTimer = createSelector(_selectTrackerState, state => state.timer);
export const _selectPlatforms = createSelector(_selectTrackerState, state => state.platforms);
export const _selectDisplay = createSelector(_selectTrackerState, state => state.display);

export const _selectTimerInfo = createSelector(_selectTimer, timer => timer as TimerInfo);

export const _selectPlatformsOptions = createSelector(_selectPlatforms, platforms => platforms.options);

export const _selectEntriesToShow = createSelector(_selectDisplay, display => display.entriesToShow);

const trackerSelectors = {
  timerInfo: _selectTimerInfo,
  platformsOptions: _selectPlatformsOptions,
  entriesToShow: _selectEntriesToShow
};

export default trackerSelectors;
