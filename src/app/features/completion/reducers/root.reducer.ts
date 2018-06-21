import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPlaying from './add-playing.reducer';
import * as fromMarkComplete from './mark-complete.reducer';
import * as fromProgress from './progress.reducer';

import { AddPlayingInfo, ProgressItem } from '../models';

export interface CompletionState {
  addPlaying: fromPlaying.State;
  progress: fromProgress.State;
  markComplete: fromMarkComplete.State;
}

export interface State {
  completion: CompletionState;
}

export const reducers: ActionReducerMap<CompletionState, any> = {
  addPlaying: fromPlaying.reducer,
  progress: fromProgress.reducer,
  markComplete: fromMarkComplete.reducer
};

export const _selectCompletionState = createFeatureSelector<CompletionState>('completion');
export const _selectPlaying = createSelector(_selectCompletionState, state => state.addPlaying);
export const _selectProgress = createSelector(_selectCompletionState, state => state.progress);
export const _selectMarkComplete = createSelector(_selectCompletionState, state => state.markComplete);

export const _selectAddPlayingInfo = createSelector(_selectPlaying, playing => playing as AddPlayingInfo);

export const { selectAll: _selectAllProgress } = fromProgress.adapter.getSelectors(_selectProgress);
export const _selectPlayingProgress = createSelector(_selectAllProgress,
  entities => entities.filter(entity => entity.endEntryId === '')
    .map(entity => entity as ProgressItem));
export const _selectCompletedProgress = createSelector(_selectAllProgress,
  entities => entities.filter(entity => entity.endEntryId !== '')
    .map(entity => entity as ProgressItem));

export const { selectEntities: _selectMarkCompleteEntities } = fromMarkComplete.adapter.getSelectors(_selectMarkComplete);

const completionSelectors = {
  addPlayingInfo: _selectAddPlayingInfo,
  playing: _selectPlayingProgress,
  completed: _selectCompletedProgress,
  markCompleteEntities: _selectMarkCompleteEntities
};

export default completionSelectors;
