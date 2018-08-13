import { Params, RouterStateSnapshot } from '@angular/router';

import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromError from './error.reducer';

import { Error } from '../models';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  error: fromError.State;
}

export const reducers: ActionReducerMap<State, any> = {
  router: fromRouter.routerReducer,
  error: fromError.reducer
};

export const _selectErrorState = createFeatureSelector<fromError.State>('error');
export const _selectError = createSelector(_selectErrorState, state => state as Error);

const rootComponentSelectors = {
  error: _selectError
};

export default rootComponentSelectors;

interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouterStateSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}
