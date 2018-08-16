import { tassign } from 'tassign';

import * as actions from '../actions/profile.actions';

export interface State {
  displayName: string;
}

const initialState: State = {
  displayName: ''
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.LOAD_PROFILE_SUCCEEDED: {
      return tassign(state, action.profile);
    }
    case actions.SET_PROFILE_DISPLAYNAME_SUCCEEDED: {
      return tassign(state, {
        displayName: action.displayName
      });
    }
    case actions.CLEAR_PROFILE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
