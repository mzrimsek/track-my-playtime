import { tassign } from 'tassign';

import * as actions from '../actions/display.actions';

export interface State {
  entriesToShow: number;
}

const initialState: State = {
  entriesToShow: 4
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.INCREMENT_DAYS_TO_SHOW: {
      return tassign(state, { entriesToShow: state.entriesToShow + action.amount });
    }
    default: {
      return state;
    }
  }
}
