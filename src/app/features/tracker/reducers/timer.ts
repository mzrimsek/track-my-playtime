import { tassign } from 'tassign';
import * as actions from '../actions/timer';

export interface State {
  game: string;
  platform: string;
  startDate: string;
  startTime: string;
  active: boolean;
  platforms: string[];
}

const initialState: State = {
  game: '',
  platform: '',
  startDate: '',
  startTime: '',
  active: false,
  platforms: []
};


export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.TIMER_START: {
      const currentDate = new Date();
      return tassign(state, {
        startDate: currentDate.toDateString(),
        startTime: currentDate.toTimeString(),
        active: true
      });
    }
    case actions.RESET_TIMER: {
      const platforms = state.platforms;
      return tassign(initialState, { platforms: platforms });
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
