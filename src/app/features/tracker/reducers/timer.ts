import { tassign } from 'tassign';
import * as actions from '../actions/timer';

export interface State {
  game: string;
  platform: string;
  time: number;
  active: boolean;
  platforms: string[];
}

const initialState: State = {
  game: '',
  platform: '',
  time: 0,
  active: false,
  platforms: []
};


export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.TIMER_START: {
      return tassign(state, { active: true });
    }
    case actions.TIMER_STOP: {
      return tassign(state, {
        game: '',
        platform: '',
        time: 0,
        active: false,
      });
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
