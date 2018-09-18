import * as actions from '../actions/timer.actions';

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
    case actions.RESET_TIMER: {
      return initialState;
    }
    case actions.SET_GAME: {
      return {
        ...state,
        game: action.game
      };
    }
    case actions.SET_PLATFORM: {
      return {
        ...state,
        platform: action.platform
      };
    }
    case actions.SET_START_TIME: {
      return {
        ...state,
        startTime: action.startTime
      };
    }
    case actions.SET_TIMER_INFO: {
      return {
        ...state,
        ...action.info
      };
    }
    default: {
      return state;
    }
  }
}
