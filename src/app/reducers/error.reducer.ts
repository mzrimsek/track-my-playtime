import * as actions from '../actions/app.actions';

export interface State {
  action: string;
  message: string;
}

const initialState: State = {
  action: '',
  message: ''
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.APP_ERROR: {
      return {
        ...state,
        action: action.action,
        message: action.message
      };
    }
    default: {
      return state;
    }
  }
}
