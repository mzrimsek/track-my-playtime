import { tassign } from 'tassign';
import * as actions from '../actions/timer';

export interface State {
  game: string;
  platform: string;
  startDate: Date | null;
  active: boolean;
  platforms: string[];
}

const initialState: State = {
  game: '',
  platform: '',
  startDate: null,
  active: false,
  platforms: []
};


export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.TIMER_START: {
      return tassign(state, {
        startDate: new Date(),
        active: true
      });
    }
    case actions.RESET_TIMER: {
      return tassign(initialState, { platforms: state.platforms });
    }
    case actions.SET_GAME: {
      return tassign(state, { game: action.game });
    }
    case actions.SET_PLATFORM: {
      return tassign(state, { platform: action.platform });
    }
    case actions.LOAD_PLATFORMS_SUCCEEDED: {
      return tassign(state, { platforms: action.platforms });
    }
    default: {
      return state;
    }
  }
}
