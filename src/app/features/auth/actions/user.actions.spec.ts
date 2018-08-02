import * as actions from './user.actions';

import { User } from '../models';

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
        photoURL: ''
      });
      expect(action.type).toBe(actions.AUTHENTICATED);
    });

    it('Should have correct user', () => {
      const user: User = {
        uid: 'some id',
        displayName: 'Jim Bob',
        email: 'jimbob@jimbob.com',
        photoURL: 'jimbob.com/jimbob.png'
      };
      const action = new actions.Authenticated(user);

      expect(action.user).toEqual(user);
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
