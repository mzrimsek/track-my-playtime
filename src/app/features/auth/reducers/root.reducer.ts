import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './user.reducer';

export interface AuthState {
  user: fromUser.State;
}

export interface State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  user: fromUser.reducer
};

export const _selectAuthState = createFeatureSelector<AuthState>('auth');
export const _selectUser = createSelector(_selectAuthState, state => state.user);

export const _selectUserLoggedIn = createSelector(_selectUser, user => user.uid !== '');
export const _selectUserData = createSelector(_selectUser, user => user);

const authComponentSelectors = {
  isUserLoggedIn: _selectUserLoggedIn,
  user: _selectUserData
};

export default authComponentSelectors;
