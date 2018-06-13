import { tassign } from 'tassign';

import * as actions from '../actions/add-playing.actions';

export interface State {
  game: string;
  platform: string;
  startTime: number;
}

const initialState: State = {
  game: '',
  platform: '',
  startTime: 0
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_GAME: {
      return tassign(state, { game: action.game });
    }
    case actions.SET_PLATFORM: {
      return tassign(state, { platform: action.platform });
    }
    case actions.SET_STARTTIME: {
      return tassign(state, { startTime: action.startTime });
    }
    default: {
      return state;
    }
  }
}
