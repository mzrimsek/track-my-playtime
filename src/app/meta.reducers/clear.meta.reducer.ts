import { ActionReducer } from '@ngrx/store';

import * as userActions from '../features/auth/actions/user.actions';

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    switch (action.type) {
      case userActions.LOGOUT: {
        state = undefined;
      }
    }

    return reducer(state, action);
  };
}
