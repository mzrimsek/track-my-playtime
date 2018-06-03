import { Params, RouterStateSnapshot } from '@angular/router';

import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import * as fromError from './error.reducer';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  error: fromError.State;
}

export const reducers: ActionReducerMap<State, any> = {
  router: fromRouter.routerReducer,
  error: fromError.reducer
};

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
