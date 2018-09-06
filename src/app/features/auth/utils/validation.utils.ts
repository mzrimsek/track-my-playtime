import * as userActions from '../actions/user.actions';

import { Error } from '../../../models';

export const EMAIL_IN_USE = 'Email address already in use.';
export const INVALID_CREDENTIALS = 'Email or password invalid.';

export const POPUP_CLOSED = 'The popup has been closed by the user before finalizing the operation.';

export const getValidationMessage = (error: Error): string => {
  switch (error.action) {
    case userActions.SIGNUP: {
      return EMAIL_IN_USE;
    }
    case userActions.EMAIL_LOGIN: {
      return INVALID_CREDENTIALS;
    }
    case userActions.GOOGLE_LOGIN:
    case userActions.FACEBOOK_LOGIN:
    case userActions.TWITTER_LOGIN: {
      return error.message === POPUP_CLOSED ? '' : EMAIL_IN_USE;
    }
    default: {
      return '';
    }
  }
};
