import * as actions from 'features/profile/actions/profile.actions';

export interface State {
  displayName: string;
}

const initialState: State = {
  displayName: ''
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.LOAD_PROFILE_SUCCEEDED: {
      return {
        ...state,
        ...action.profile
      };
    }
    case actions.SET_PROFILE_DISPLAYNAME_SUCCEEDED: {
      return {
        ...state,
        displayName: action.displayName
      };
    }
    default: {
      return state;
    }
  }
}
