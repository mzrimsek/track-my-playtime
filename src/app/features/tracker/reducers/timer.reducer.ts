import { tassign } from 'tassign';

import * as actions from '../actions/timer.actions';

export interface State {
  game: string;
  platform: string;
  startTime: number;
  active: boolean;
}

const initialState: State = {
  game: '',
  platform: '',
  startTime: 0,
  active: false
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.START_TIMER: {
      return tassign(state, {
        startTime: new Date().getTime(),
        active: true
      });
    }
    case actions.RESET_TIMER: {
      return initialState;
    }
    case actions.SET_GAME: {
      return tassign(state, { game: action.game });
    }
    case actions.SET_PLATFORM: {
      return tassign(state, { platform: action.platform });
    }
    default: {
      return state;
    }
  }
}
