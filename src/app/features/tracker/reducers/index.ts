import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTimer from './timer';

export interface TrackerState {
  timer: fromTimer.State;
}

export interface State {
  tracker: TrackerState;
}

export const reducers: ActionReducerMap<TrackerState> = {
  timer: fromTimer.reducer
};

export const _selectTrackerState = createFeatureSelector<TrackerState>('tracker');
export const _selectTimer = createSelector(_selectTrackerState, state => state.timer);

export const _selectTimerActive = createSelector(_selectTimer, timer => timer.active);

const trackerComponentSelectors = {
  timerActive: _selectTimerActive
};

export default trackerComponentSelectors;
