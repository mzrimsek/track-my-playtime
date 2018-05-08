import { addDays, startOfWeek } from 'date-fns';
import { tassign } from 'tassign';

import * as actions from '../actions/date-range.actions';

export interface State {
  startDay: Date;
  endDay: Date;
}

const start = startOfWeek(new Date());
const end = addDays(start, 6);
const initalState: State = {
  startDay: start,
  endDay: end
};

export function reducer(state: State = initalState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_START_DAY: {
      const startDay = new Date(action.start);
      return tassign(state, { startDay });
    }
    case actions.SET_END_DAY: {
      const endDay = new Date(action.end);
      return tassign(state, { endDay });
    }
    default: {
      return state;
    }
  }
}
