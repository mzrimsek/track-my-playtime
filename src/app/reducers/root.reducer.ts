import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from '../shared/utils/router.utils';
import * as fromError from './error.reducer';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  error: fromError.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  error: fromError.reducer
};
