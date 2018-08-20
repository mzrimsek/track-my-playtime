import * as actions from './user.actions';

import { user } from '../../../test-helpers';

describe('User Actions', () => {
  describe('GetUser', () => {
    it('Should have correct type', () => {
      const action = new actions.GetUser();
      expect(action.type).toBe(actions.GET_USER);
    });
  });

  describe('Authenticated', () => {
    it('Should have correct type', () => {
      const action = new actions.Authenticated({
        uid: '',
        displayName: '',
        email: '',
        photoURL: '',
        providerId: ''
      });
      expect(action.type).toBe(actions.AUTHENTICATED);
    });

    it('Should have correct user', () => {
      const action = new actions.Authenticated(user.mockUser);
      expect(action.user).toEqual(user.mockUser);
    });
  });

  describe('NotAuthenticated', () => {
    it('Should have correct type', () => {
      const action = new actions.NotAuthenticated();
      expect(action.type).toBe(actions.NOT_AUTHENTICATED);
    });
  });

  describe('GoogleLogin', () => {
    it('Should have correct type', () => {
      const action = new actions.GoogleLogin();
      expect(action.type).toBe(actions.GOOGLE_LOGIN);
    });
  });

  describe('FacebookLogin', () => {
    it('Should have correct type', () => {
      const action = new actions.FacebookLogin();
      expect(action.type).toBe(actions.FACEBOOK_LOGIN);
    });
  });

  describe('GetUser', () => {
    it('Should have correct type', () => {
      const action = new actions.Logout();
      expect(action.type).toBe(actions.LOGOUT);
    });
  });

  describe('SignUp', () => {
    it('Should have correct type', () => {
      const action = new actions.SignUp('', '');
      expect(action.type).toBe(actions.SIGNUP);
    });

    it('Should have correct email', () => {
      const action = new actions.SignUp('email', '');
      expect(action.email).toBe('email');
    });

    it('Should have correct password', () => {
      const action = new actions.SignUp('', 'password');
      expect(action.password).toBe('password');
    });
  });

  describe('EmailLogin', () => {
    it('Should have correct type', () => {
      const action = new actions.EmailLogin('', '');
      expect(action.type).toBe(actions.EMAIL_LOGIN);
    });

    it('Should have correct email', () => {
      const action = new actions.EmailLogin('email', '');
      expect(action.email).toBe('email');
    });

    it('Should have correct password', () => {
      const action = new actions.EmailLogin('', 'password');
      expect(action.password).toBe('password');
    });
  });

  describe('ResetPassword', () => {
    it('Should have correct type', () => {
      const action = new actions.ResetPassword('');
      expect(action.type).toBe(actions.RESET_PASSWORD);
    });

    it('Should have correct email', () => {
      const action = new actions.ResetPassword('email');
      expect(action.email).toBe('email');
    });
  });
});
