import * as userActions from '../actions/user.actions';

import { Error } from '../../../models';

export const getValidationMessage = (error: Error): string => {
  switch (error.action) {
    case userActions.SIGNUP: {
      return 'Email address already in use.';
    }
    case userActions.EMAIL_LOGIN: {
      return 'Email or password invalid.';
    }
    default: {
      return '';
    }
  }
};
