import * as actions from 'features/completion/actions/tab.actions';

import { TabType } from 'features/completion/models';

export interface State {
  tab: TabType;
}

const initialState: State = {
  tab: 'PLAYING'
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_VISIBLE_TAB: {
      return {
        ...state,
        tab: action.tab
      };
    }
    default: {
      return state;
    }
  }
}
