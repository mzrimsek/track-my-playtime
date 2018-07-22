import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHistory from './history.reducer';
import * as fromPlatforms from './platforms.reducer';
import * as fromProgress from './progress.reducer';

import { HistoryListItem, ProgressItem } from '../models';

import { formatDate } from '../utils/date.utils';
import { getUniqueFrom } from '../utils/history-filter.utils';
import { getHistoryGroupingList, getHistoryListItemsMap } from '../utils/history.utils';

export interface SharedState {
  history: fromHistory.State;
  platforms: fromPlatforms.State;
  progress: fromProgress.State;
}

export interface State {
  shared: SharedState;
}

export const reducers: ActionReducerMap<SharedState, any> = {
  history: fromHistory.reducer,
  platforms: fromPlatforms.reducer,
  progress: fromProgress.reducer
};

export const _selectSharedState = createFeatureSelector<SharedState>('shared');
export const _selectHistory = createSelector(_selectSharedState, state => state.history);
export const _selectPlatforms = createSelector(_selectSharedState, state => state.platforms);
export const _selectProgress = createSelector(_selectSharedState, state => state.progress);

export const { selectAll: _selectAllProgress } = fromProgress.adapter.getSelectors(_selectProgress);
export const _selectPlayingProgress = createSelector(_selectAllProgress,
  entities => entities.filter(entity => entity.endEntryId === '')
    .map(entity => entity as ProgressItem));
export const _selectCompletedProgress = createSelector(_selectAllProgress,
  entities => entities.filter(entity => entity.endEntryId !== '')
    .map(entity => entity as ProgressItem));

export const { selectAll: _selectAllHistory } = fromHistory.adapter.getSelectors(_selectHistory);
export const _selectHistoryItems = createSelector(_selectAllHistory, _selectAllProgress,
  (historyEntries, progress) => historyEntries.map(
    historyEntry => <HistoryListItem>{
      ...historyEntry,
      dateRange: [
        new Date(historyEntry.startTime),
        new Date(historyEntry.endTime),
      ],
      locked: progress.some(x => x.startEntryId === historyEntry.id || x.endEntryId === historyEntry.id)
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
export const _selectTrackedGames = createSelector(_selectSortedHistoryItems, items => getUniqueFrom(items, item => item.game));

export const _selectPlatformsOptions = createSelector(_selectPlatforms, platforms => platforms.options);
export const _selectPlatformsLoaded = createSelector(_selectPlatformsOptions, platformOptions => platformOptions.length !== 0);

export const _selectUserDataLoaded = createSelector(_selectHistory, _selectProgress, _selectPlatformsLoaded,
  (history, progress, platformsLoaded) => !history.loading && !progress.loading && platformsLoaded);

const sharedSelectors = {
  historyGroupingsByDate: _selectHistoryGroupingsByDate,
  historyGroupingsByPlatform: _selectHistoryGroupingsByPlatform,
  historyGroupingsByGame: _selectHistoryGroupingsByGame,
  historyLoading: _selectHistoryLoading,
  historyTrackedGames: _selectTrackedGames,
  platformsOptions: _selectPlatformsOptions,
  progressPlaying: _selectPlayingProgress,
  progressCompleted: _selectCompletedProgress,
  userDataLoaded: _selectUserDataLoaded
};

export default sharedSelectors;
