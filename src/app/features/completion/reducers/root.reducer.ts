import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPlaying from './add-playing.reducer';
import * as fromMarkComplete from './mark-complete.reducer';

import { AddPlayingInfo } from '../models';

export interface CompletionState {
  addPlaying: fromPlaying.State;
  markComplete: fromMarkComplete.State;
}

export interface State {
  completion: CompletionState;
}

export const reducers: ActionReducerMap<CompletionState, any> = {
  addPlaying: fromPlaying.reducer,
  markComplete: fromMarkComplete.reducer
};

export const _selectCompletionState = createFeatureSelector<CompletionState>('completion');
export const _selectPlaying = createSelector(_selectCompletionState, state => state.addPlaying);
export const _selectMarkComplete = createSelector(_selectCompletionState, state => state.markComplete);

export const _selectAddPlayingInfo = createSelector(_selectPlaying, playing => playing as AddPlayingInfo);

export const { selectEntities: _selectMarkCompleteEntities } = fromMarkComplete.adapter.getSelectors(_selectMarkComplete);

const completionSelectors = {
  addPlayingInfo: _selectAddPlayingInfo,
  markCompleteEntities: _selectMarkCompleteEntities
};

export default completionSelectors;
