import * as userActions from 'features/auth/actions/user.actions';

import { Error } from 'app/models';

import {
    EMAIL_IN_USE, getValidationMessage, INVALID_CREDENTIALS, POPUP_CLOSED
} from './validation.utils';

describe('Validation Utils', () => {
  describe('getValidationMessage', () => {
    it('Should return correct value for SIGNUP action', () => {
      const error: Error = {
        action: userActions.SIGNUP,
        message: 'some message'
      };
      const result = getValidationMessage(error);
      expect(result).toBe(EMAIL_IN_USE);
    });

    it('Should return correct value for EMAIL_LOGIN action', () => {
      const error: Error = {
        action: userActions.EMAIL_LOGIN,
        message: 'some message'
      };
      const result = getValidationMessage(error);
      expect(result).toBe(INVALID_CREDENTIALS);
    });

    it('Should return correct value for GOOGLE_LOGIN action', () => {
      const error: Error = {
        action: userActions.GOOGLE_LOGIN,
        message: 'some message'
      };
      const result = getValidationMessage(error);
      expect(result).toBe(EMAIL_IN_USE);
    });

    it('Should return correct value for FACEBOOK_LOGIN action', () => {
      const error: Error = {
        action: userActions.FACEBOOK_LOGIN,
        message: 'some message'
      };
      const result = getValidationMessage(error);
      expect(result).toBe(EMAIL_IN_USE);
    });

    it('Should return nothing for GOOGLE_LOGIN when error is about popup', () => {
      const error: Error = {
        action: userActions.GOOGLE_LOGIN,
        message: POPUP_CLOSED
      };
      const result = getValidationMessage(error);
      expect(result).toBe('');
    });

    it('Should return nothing for FACEBOOK_LOGIN when error is about popup', () => {
      const error: Error = {
        action: userActions.FACEBOOK_LOGIN,
        message: POPUP_CLOSED
      };
      const result = getValidationMessage(error);
      expect(result).toBe('');
    });

    it('Should return nothing for TWITTER_LOGIN when error is about popup', () => {
      const error: Error = {
        action: userActions.TWITTER_LOGIN,
        message: POPUP_CLOSED
      };
      const result = getValidationMessage(error);
      expect(result).toBe('');
    });

    it('Should return nothing if not handled action', () => {
      const error: Error = {
        action: userActions.NOT_AUTHENTICATED,
        message: 'something bad happened'
      };
      const result = getValidationMessage(error);
      expect(result).toBe('');
    });
  });
});
