import { tassign } from 'tassign';
import * as actions from '../actions/user.actions';
import { User } from '../models';

// tslint:disable-next-line:no-empty-interface
export interface State extends User { }

const initialState: State = {
  uid: null,
  displayName: 'GUEST',
  loading: false,
  error: ''
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.GET_USER: {
      return tassign(state, { loading: true });
    }
    case actions.AUTHENTICATED: {
      return tassign(state, {
        ...action.payload,
        loading: false
      });
    }
    case actions.NOT_AUTHENTICATED: {
      return tassign(initialState, { loading: false });
    }
    case actions.GOOGLE_LOGIN: {
      return tassign(state, { loading: true });
    }
    case actions.AUTH_ERROR: {
      return tassign(state, {
        ...action.payload,
        loading: false
      });
    }
    case actions.LOGOUT: {
      return tassign(state, { loading: true });
    }
    default: {
      return state;
    }
  }
}
