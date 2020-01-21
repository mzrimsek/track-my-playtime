import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { Profile } from 'features/profile/models';

import * as fromProfile from './profile.reducer';

export interface ProfileState {
  info: fromProfile.State;
}

export interface State {
  profile: ProfileState;
}

export const reducers: ActionReducerMap<ProfileState, any> = {
  info: fromProfile.reducer
};

export const _selectProfileState = createFeatureSelector<ProfileState>('profile');
export const _selectInfo = createSelector(_selectProfileState, state => state.info as Profile);

const profileSelectors = {
  info: _selectInfo
};

export default profileSelectors;
