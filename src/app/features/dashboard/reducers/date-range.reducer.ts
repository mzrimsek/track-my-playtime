import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, subDays } from 'date-fns';
import { tassign } from 'tassign';

import * as actions from '../actions/date-range.actions';

export interface State {
  startDay: Date;
  endDay: Date;
}

const now = new Date();
const initialState: State = {
  startDay: startOfWeek(now),
  endDay: endOfWeek(now)
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_START_DAY: {
      const startDay = new Date(action.start);
      return tassign(state, { startDay });
    }
    case actions.SET_END_DAY: {
      const endDay = new Date(action.end);
      return tassign(state, { endDay });
    }
    case actions.SET_THIS_WEEK: {
      return initialState;
    }
    case actions.SET_LAST_WEEK: {
      const startThisWeek = startOfWeek(now);
      const startLastWeek = subDays(startThisWeek, 7);
      const endLastWeek = endOfWeek(startLastWeek);
      return tassign(state, {
        startDay: startLastWeek,
        endDay: endLastWeek
      });
    }
    case actions.SET_THIS_MONTH: {
      const startMonth = startOfMonth(now);
      const endMonth = endOfMonth(now);
      return tassign(state, {
        startDay: startMonth,
        endDay: endMonth
      });
    }
    default: {
      return state;
    }
  }
}
