import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTimer from './timer';
import * as fromHistory from './history';
import { TimerInfo } from '../models';

export interface TrackerState {
  timer: fromTimer.State;
  history: fromHistory.State;
}

export interface State {
  tracker: TrackerState;
}

export const reducers: ActionReducerMap<TrackerState> = {
  timer: fromTimer.reducer,
  history: fromHistory.reducer
};

export const _selectTrackerState = createFeatureSelector<TrackerState>('tracker');
export const _selectTimer = createSelector(_selectTrackerState, state => state.timer);
export const _selectHistory = createSelector(_selectTrackerState, state => state.history);

export const _selectTimerInfo = createSelector(_selectTimer, timer => {
  return <TimerInfo>{
    active: timer.active,
    game: timer.game,
    platform: timer.platform,
    platforms: timer.platforms
  };
});

export const _selectTimerStartDate = createSelector(_selectTimer, state => state.startDate);

const trackerComponentSelectors = {
  timerInfo: _selectTimerInfo,
  timerStartDate: _selectTimerStartDate
};

export default trackerComponentSelectors;
