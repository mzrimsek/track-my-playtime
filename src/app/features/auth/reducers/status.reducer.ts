import * as actions from 'features/auth/actions/status.actions';

export interface State {
  attemptingLogin: boolean;
  validationMessage: string;
}

const initialState: State = {
  attemptingLogin: false,
  validationMessage: ''
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_ATTEMPTING_LOGIN: {
      return {
        ...state,
        attemptingLogin: action.attemptingLogin
      };
    }
    case actions.SET_VALIDATION_MESSAGE: {
      return {
        ...state,
        validationMessage: action.validationMessage
      };
    }
    default: {
      return state;
    }
  }
}
