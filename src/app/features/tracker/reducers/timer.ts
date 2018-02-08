import { tassign } from 'tassign';
import * as actions from '../actions/timer';

export interface State {
  game: string;
  platform: string;
  time: number;
  active: boolean;
}

const initialState: State = {
  game: '',
  platform: '',
  time: 0,
  active: false
};


export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.TIMER_START: {
      return tassign(state, { active: true });
    }
    case actions.TIMER_STOP: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
