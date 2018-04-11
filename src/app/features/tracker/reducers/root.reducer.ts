import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHistory from './history.reducer';
import * as fromPlatforms from './platforms.reducer';
import * as fromTimer from './timer.reducer';

import { HistoryGroupingListItem, HistoryListItem, TimerInfo } from '../models';

import { formatElapsedTime } from '../../../shared/utils/date.utils';
import {
    getDateFromHistoryListItem, getHistoryGroupingsFromHistoryListItemsMap, getHistoryListItemsMap
} from '../utils/history.utils';

export interface TrackerState {
  timer: fromTimer.State;
  history: fromHistory.State;
  platforms: fromPlatforms.State;
}

export interface State {
  tracker: TrackerState;
}

export const reducers: ActionReducerMap<TrackerState> = {
  timer: fromTimer.reducer,
  history: fromHistory.reducer,
  platforms: fromPlatforms.reducer
};

export const _selectTrackerState = createFeatureSelector<TrackerState>('tracker');
export const _selectTimer = createSelector(_selectTrackerState, state => state.timer);
export const _selectHistory = createSelector(_selectTrackerState, state => state.history);
export const _selectPlatforms = createSelector(_selectTrackerState, state => state.platforms);

export const _selectTimerStartTime = createSelector(_selectTimer, state => state.startTime);
export const _selectTimerInfo = createSelector(_selectTimer, _selectTimerStartTime,
  (timer, startDate) =>
    <TimerInfo>{
      ...timer,
      startDate
    });

export const { selectAll: _selectAllHistory } = fromHistory.adapter.getSelectors(_selectHistory);
export const _selectHistoryItems = createSelector(_selectAllHistory,
  entities => entities.map(
    entity => <HistoryListItem>{
      ...entity,
      dateRange: [
        new Date(entity.startTime),
        new Date(entity.endTime)
      ]
    }));
export const _selectSortedHistoryItems = createSelector(_selectHistoryItems, items => items.sort((a, b) => b.startTime - a.startTime));
export const _selectHistoryGroupingsByDate = createSelector(_selectSortedHistoryItems, items => {
  const historyListItemsMap = getHistoryListItemsMap(items, getDateFromHistoryListItem);
  return getHistoryGroupingsFromHistoryListItemsMap(historyListItemsMap);
});
export const _selectHistoryGroupingsByPlatform = createSelector(_selectSortedHistoryItems, items => {
  const historyListItemsMap = getHistoryListItemsMap(items, item => item.platform);
  return getHistoryGroupingsFromHistoryListItemsMap(historyListItemsMap);
});
export const _selectHistoryGroupingsByGame = createSelector(_selectSortedHistoryItems, items => {
  const historyListItemsMap = getHistoryListItemsMap(items, item => item.game);
  return getHistoryGroupingsFromHistoryListItemsMap(historyListItemsMap);
});
export const _selectHistoryGroupingListItemsByDate = createSelector(_selectHistoryGroupingsByDate, groupings =>
  groupings.map(grouping => <HistoryGroupingListItem>{
    key: grouping.key,
    totalTime: formatElapsedTime(grouping.totalTime),
    historyItems: grouping.historyItems
  })
);
export const _selectHistoryLoading = createSelector(_selectHistory, history => history.loading);

export const _selectPlatformsOptions = createSelector(_selectPlatforms, platforms => platforms.options);

const trackerComponentSelectors = {
  timerInfo: _selectTimerInfo,
  historyGroupingsByDate: _selectHistoryGroupingsByDate,
  historyGroupingsByPlatform: _selectHistoryGroupingsByPlatform,
  historyGroupingsByGame: _selectHistoryGroupingsByGame,
  historyGroupingListItemsByDate: _selectHistoryGroupingListItemsByDate,
  historyLoading: _selectHistoryLoading,
  platformsOptions: _selectPlatformsOptions
};

export default trackerComponentSelectors;
