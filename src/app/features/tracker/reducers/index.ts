import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TimerInfo, HistoryListItem } from '../models';
import * as fromTimer from './timer';
import * as fromHistory from './history';

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

export const _selectTimerStartDate = createSelector(_selectTimer, state => state.startDate);
export const _selectTimerInfo = createSelector(_selectTimer, _selectTimerStartDate, (timer, startDate) => {
  return <TimerInfo>{
    ...timer,
    startDate
  };
});

export const { selectAll: _selectAllHistory } = fromHistory.adapter.getSelectors(_selectHistory);
export const _selectHistoryItems = createSelector(_selectAllHistory,
  entities => entities.map(
    entity => <HistoryListItem>{
      ...entity
    }));

const trackerComponentSelectors = {
  timerInfo: _selectTimerInfo,
  timerStartDate: _selectTimerStartDate,
  historyItems: _selectHistoryItems
};

export default trackerComponentSelectors;
