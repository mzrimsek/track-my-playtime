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
      return {
        ...state,
        game: action.game,
        platform: '',
        startTime: 0
      };
    }
    case actions.SET_PLATFORM: {
      return {
        ...state,
        platform: action.platform,
        startTime: 0
      };
    }
    case actions.SET_STARTTIME: {
      return {
        ...state,
        startTime: action.startTime
      };
    }
    case actions.RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
