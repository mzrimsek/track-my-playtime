import { tassign } from 'tassign';
import * as actions from '../actions/app.actions';

export interface State {
  message: string;
}

const initialState: State = {
  message: ''
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.APP_ERROR: {
      return tassign(state, { message: action.message });
    }
    default: {
      return state;
    }
  }
}
