import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import * as fromError from './error.reducer';

import { RouterStateUrl } from '../shared/utils/router.utils';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  error: fromError.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  error: fromError.reducer
};
