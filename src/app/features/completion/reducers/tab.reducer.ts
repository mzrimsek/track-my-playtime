import { tassign } from 'tassign';

import * as actions from '../actions/tab.actions';

import { CompletionTabs } from '../models';

export interface State {
  tab: CompletionTabs;
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
