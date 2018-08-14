import * as userActions from '../actions/user.actions';

import { Error } from '../../../models';

import { getValidationMessage } from './validation.utils';

describe('Validation Utils', () => {
  describe('getValidationMessage', () => {
    it('Should return correct value for SIGNUP action', () => {
      const error: Error = {
        action: userActions.SIGNUP,
        message: 'some message'
      };
      const result = getValidationMessage(error);
      expect(result).toBe('Email address already in use.');
    });

    it('Should return correct value for EMAIL_LOGIN action', () => {
      const error: Error = {
        action: userActions.EMAIL_LOGIN,
        message: 'some message'
      };
      const result = getValidationMessage(error);
      expect(result).toBe('Email or password invalid.');
    });

    it('Should return error message if not handled action', () => {
      const error: Error = {
        action: userActions.GOOGLE_LOGIN,
        message: 'something bad happened'
      };
      const result = getValidationMessage(error);
      expect(result).toBe(error.message);
    });
  });
});
