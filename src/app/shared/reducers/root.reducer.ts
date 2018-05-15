import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHistory from './history.reducer';

import { HistoryListItem } from '../models';

import { formatDate } from '../utils/date.utils';
import { getHistoryGroupingList, getHistoryListItemsMap } from '../utils/history.utils';

export interface SharedState {
  history: fromHistory.State;
}

export interface State {
  shared: SharedState;
}

export const reducers: ActionReducerMap<SharedState> = {
  history: fromHistory.reducer
};

export const _selectSharedState = createFeatureSelector<SharedState>('shared');
export const _selectHistory = createSelector(_selectSharedState, state => state.history);

export const { selectAll: _selectAllHistory } = fromHistory.adapter.getSelectors(_selectHistory);
export const _selectHistoryItems = createSelector(_selectAllHistory,
  entities => entities.map(
    entity => <HistoryListItem>{
      ...entity,
      dateRange: [
        new Date(entity.startTime),
        new Date(entity.endTime),
      ]
    }));
export const _selectSortedHistoryItems = createSelector(_selectHistoryItems, items => items.sort((a, b) => b.startTime - a.startTime));
export const _selectHistoryGroupingsByDate = createSelector(_selectSortedHistoryItems, items => {
  const historyListItemsMap = getHistoryListItemsMap(items, item => formatDate(item.dateRange[0]));
  return getHistoryGroupingList(historyListItemsMap);
});
export const _selectHistoryGroupingsByPlatform = createSelector(_selectSortedHistoryItems, items => {
  const historyListItemsMap = getHistoryListItemsMap(items, item => item.platform);
  return getHistoryGroupingList(historyListItemsMap);
});
export const _selectHistoryGroupingsByGame = createSelector(_selectSortedHistoryItems, items => {
  const historyListItemsMap = getHistoryListItemsMap(items, item => item.game);
  return getHistoryGroupingList(historyListItemsMap);
});
export const _selectHistoryLoading = createSelector(_selectHistory, history => history.loading);
export const _selectTrackedGames = createSelector(_selectSortedHistoryItems, items => {
  const games = items.map(item => item.game);
  return Array.from(new Set(games));
});

const sharedSelectors = {
  historyGroupingsByDate: _selectHistoryGroupingsByDate,
  historyGroupingsByPlatform: _selectHistoryGroupingsByPlatform,
  historyGroupingsByGame: _selectHistoryGroupingsByGame,
  historyLoading: _selectHistoryLoading,
  historyTrackedGames: _selectTrackedGames
};

export default sharedSelectors;
