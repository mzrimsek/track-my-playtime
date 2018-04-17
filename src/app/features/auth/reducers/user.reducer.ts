import { tassign } from 'tassign';

import * as actions from '../actions/user.actions';

import { User } from '../models';

// tslint:disable-next-line:no-empty-interface
export interface State extends User { }

const initialState: State = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: ''
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.AUTHENTICATED: {
      return tassign(state, action.user);
    }
    case actions.NOT_AUTHENTICATED: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
