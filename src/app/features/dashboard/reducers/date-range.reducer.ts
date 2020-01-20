import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, subDays } from 'date-fns';
import * as actions from 'features/dashboard/actions/date-range.actions';

import { DateRangeType } from 'features/dashboard/models';

export interface State {
  startDay: Date;
  endDay: Date;
  type: DateRangeType;
}

const getState = (startDay: Date, endDay: Date, type: DateRangeType): State => {
  return {
    startDay,
    endDay,
    type
  };
};

const now = new Date();
const startWeek = startOfWeek(now);
const endWeek = endOfWeek(now);
const initialState: State = getState(startWeek, endWeek, 'THIS_WEEK');

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_THIS_WEEK: {
      return initialState;
    }
    case actions.SET_LAST_WEEK: {
      const startThisWeek = startOfWeek(now);
      const endLastWeek = subDays(startThisWeek, 1);
      const startLastWeek = startOfWeek(endLastWeek);
      return getState(startLastWeek, endLastWeek, 'LAST_WEEK');
    }
    case actions.SET_THIS_MONTH: {
      const startMonth = startOfMonth(now);
      const endMonth = endOfMonth(now);
      return getState(startMonth, endMonth, 'THIS_MONTH');
    }
    case actions.SET_LAST_MONTH: {
      const startThisMonth = startOfMonth(now);
      const endLastMonth = subDays(startThisMonth, 1);
      const startLastMonth = startOfMonth(endLastMonth);
      return getState(startLastMonth, endLastMonth, 'LAST_MONTH');
    }
    default: {
      return state;
    }
  }
}
