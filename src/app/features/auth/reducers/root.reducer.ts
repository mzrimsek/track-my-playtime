import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from 'features/auth/models';

import * as fromStatus from './status.reducer';
import * as fromUser from './user.reducer';

export interface AuthState {
  user: fromUser.State;
  status: fromStatus.State;
}

export interface State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState, any> = {
  user: fromUser.reducer,
  status: fromStatus.reducer
};

export const _selectAuthState = createFeatureSelector<AuthState>('auth');
export const _selectUser = createSelector(_selectAuthState, state => state.user);
export const _selectStatus = createSelector(_selectAuthState, state => state.status);

export const _selectUserLoggedIn = createSelector(_selectUser, user => user.uid !== '');
export const _selectUserData = createSelector(_selectUser, user => user as User);

export const _selectStatusLoggingIn = createSelector(_selectStatus, status => status.attemptingLogin);
export const _selectStatusValidationMessage = createSelector(_selectStatus, status => status.validationMessage);

const authComponentSelectors = {
  isUserLoggedIn: _selectUserLoggedIn,
  user: _selectUserData,
  loggingIn: _selectStatusLoggingIn,
  validationMessage: _selectStatusValidationMessage
};

export default authComponentSelectors;
