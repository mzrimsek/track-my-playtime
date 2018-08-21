import * as userActions from '../actions/user.actions';

import { Error } from '../../../models';

export const EMAIL_IN_USE = 'Email address already in use.';
export const INVALID_CREDENTIALS = 'Email or password invalid.';

export const getValidationMessage = (error: Error): string => {
  switch (error.action) {
    case userActions.SIGNUP: {
      return EMAIL_IN_USE;
    }
    case userActions.EMAIL_LOGIN: {
      return INVALID_CREDENTIALS;
    }
    case userActions.GOOGLE_LOGIN: {
      return EMAIL_IN_USE;
    }
    case userActions.FACEBOOK_LOGIN: {
      return EMAIL_IN_USE;
    }
    default: {
      return '';
    }
  }
};
