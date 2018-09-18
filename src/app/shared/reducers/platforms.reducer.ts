import * as actions from '../actions/platforms.actions';

export interface State {
  options: string[];
}

const initialState: State = {
  options: []
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.LOAD_OPTIONS_SUCCEEDED: {
      return {
        ...state,
        options: action.platforms
      };
    }
    default: {
      return state;
    }
  }
}
