import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPlaying from './add-playing.reducer';
import * as fromProgress from './progress.reducer';

import { AddPlayingInfo } from '../models';

export interface CompletionState {
  addPlaying: fromPlaying.State;
  progress: fromProgress.State;
}

export interface State {
  completion: CompletionState;
}

export const reducers: ActionReducerMap<CompletionState, any> = {
  addPlaying: fromPlaying.reducer,
  progress: fromProgress.reducer
};

export const _selectCompletionState = createFeatureSelector<CompletionState>('completion');
export const _selectPlaying = createSelector(_selectCompletionState, state => state.addPlaying);
export const _selectProgress = createSelector(_selectCompletionState, state => state.progress);

export const _selectAddPlayingInfo = createSelector(_selectPlaying, playing => playing as AddPlayingInfo);

const completionSelectors = {
  addPlayingInfo: _selectAddPlayingInfo
};

export default completionSelectors;
