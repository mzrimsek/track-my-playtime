import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
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

export const _selectAuthFeature = createFeatureSelector<AuthState>('auth');

const authComponentSelectors = {
};

export default authComponentSelectors;
