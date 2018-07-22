import { tassign } from 'tassign';

import * as actions from '../actions/tab.actions';

import { TabType } from '../models';

export interface State {
  tab: TabType;
}

const initialState: State = {
  tab: 'PLAYING'
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_VISIBLE_TAB: {
      return tassign(state, { tab: action.tab });
    }
    default: {
      return state;
    }
  }
}
