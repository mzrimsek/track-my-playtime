import { tassign } from 'tassign';

import * as appActions from '../../../actions/app.actions';
import * as actions from '../actions/user.actions';

import { Error } from '../../../models';

import { getValidationMessage } from '../utils/validation.utils';

export interface State {
  attemptingLogin: boolean;
  validationMessage: string;
}

const initialState: State = {
  attemptingLogin: false,
  validationMessage: ''
};

export function reducer(state: State = initialState, action: actions.All | appActions.All): State {
  switch (action.type) {
    case actions.EMAIL_LOGIN: {
      return tassign(state, {
        attemptingLogin: true
      });
    }
    case actions.SIGNUP: {
      return tassign(state, {
        attemptingLogin: true
      });
    }
    case actions.GOOGLE_LOGIN: {
      return tassign(state, {
        attemptingLogin: true
      });
    }
    case actions.FACEBOOK_LOGIN: {
      return tassign(state, {
        attemptingLogin: true
      });
    }
    case actions.AUTHENTICATED: {
      return tassign(state, {
        attemptingLogin: false
      });
    }
    case actions.NOT_AUTHENTICATED: {
      return tassign(state, {
        attemptingLogin: false
      });
    }
    case appActions.APP_ERROR: {
      const error = action as Error;
      const validationMessage = getValidationMessage(error);
      return tassign(state, {
        attemptingLogin: false,
        validationMessage
      });
    }
    default: {
      return state;
    }
  }
}
