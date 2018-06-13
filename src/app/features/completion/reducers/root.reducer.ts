import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPlaying from './add-playing.reducer';

import { AddPlaying } from '../models';

export interface CompletionState {
  addPlaying: fromPlaying.State;
}

export interface State {
  completion: CompletionState;
}

export const reducers: ActionReducerMap<CompletionState, any> = {
  addPlaying: fromPlaying.reducer
};

export const _selectCompletionState = createFeatureSelector<CompletionState>('completion');
export const _selectPlaying = createSelector(_selectCompletionState, state => state.addPlaying);

export const _selectAddPlayingInfo = createSelector(_selectPlaying, playing => playing as AddPlaying);

const completionSelectors = {
  addPlayingInfo: _selectAddPlayingInfo
};

export default completionSelectors;
