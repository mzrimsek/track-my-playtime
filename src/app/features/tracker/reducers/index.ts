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
export const _selectTimerGame = createSelector(_selectTimer, state => state.game);
export const _selectTimerPlatform = createSelector(_selectTimer, state => state.platform);
export const _selectTimerPlatforms = createSelector(_selectTimer, state => state.platforms);
export const _selectTimerStartDate = createSelector(_selectTimer, state => state.startDate);
export const _selectTimerStartDateParsed = createSelector(_selectTimerStartDate, startDate => new Date(startDate));

const trackerComponentSelectors = {
  timer: {
    active: _selectTimerActive,
    game: _selectTimerGame,
    platform: _selectTimerPlatform,
    platforms: _selectTimerPlatforms,
    startDate: _selectTimerStartDateParsed
  }
};

export default trackerComponentSelectors;
