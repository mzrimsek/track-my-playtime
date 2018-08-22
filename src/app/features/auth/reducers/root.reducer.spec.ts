import {
    _selectStatusLoggingIn, _selectStatusValidationMessage, _selectUserData, _selectUserLoggedIn,
    AuthState, State
} from './root.reducer';
import { State as StatusState } from './status.reducer';
import { State as UserState } from './user.reducer';

import { user } from '../../../test-helpers';

describe('Auth Root Reducer', () => {
  describe('User State Selectors', () => {
    describe('_selectUserLoggedIn', () => {
      it('Should return true if uid is set', () => {
        const authState: AuthState = {
          user: {
            ...initialUserState,
            uid: 'some uid'
          },
          status: initialStatusState
        };
        const state: State = { auth: authState };

        const result = _selectUserLoggedIn(state);

        expect(result).toBe(true);
      });

      it('Should return false if uid is not set', () => {
        const authState: AuthState = {
          user: initialUserState,
          status: initialStatusState
        };
        const state: State = { auth: authState };

        const result = _selectUserLoggedIn(state);

        expect(result).toBe(false);
      });
    });

    describe('_selectUserData', () => {
      it('Should return the user data', () => {
        const userState: UserState = {
          ...user.mockUser
        };
        const authState: AuthState = {
          user: userState,
          status: initialStatusState
        };
        const state: State = { auth: authState };

        const result = _selectUserData(state);

        expect(result).toEqual(user.mockUser);
      });
    });
  });

  describe('Status State Selectors', () => {
    describe('_selectStatusLoggingIn', () => {
      it('Should return attemptingLogin', () => {
        const authState: AuthState = {
          user: initialUserState,
          status: {
            attemptingLogin: true,
            validationMessage: ''
          }
        };
        const state: State = { auth: authState };

        const result = _selectStatusLoggingIn(state);

        expect(result).toBe(true);
      });
    });

    describe('_selectStatusValidationMessage', () => {
      it('Should return validationMessage', () => {
        const authState: AuthState = {
          user: initialUserState,
          status: {
            attemptingLogin: false,
            validationMessage: 'some message'
          }
        };
        const state: State = { auth: authState };

        const result = _selectStatusValidationMessage(state);

        expect(result).toBe('some message');
      });
    });
  });
});

export const initialUserState: UserState = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  providerId: ''
};

export const initialStatusState: StatusState = {
  attemptingLogin: false,
  validationMessage: ''
};
