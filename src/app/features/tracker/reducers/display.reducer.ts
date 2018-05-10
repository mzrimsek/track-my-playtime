import { tassign } from 'tassign';

import * as actions from '../actions/display.actions';

export interface State {
  daysToShow: number;
}

const initialState: State = {
  daysToShow: 7
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.INCREMENT_DAYS_TO_SHOW: {
      return tassign(state, { daysToShow: state.daysToShow + action.amount });
    }
    default: {
      return state;
    }
  }
}
