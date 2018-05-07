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
});
