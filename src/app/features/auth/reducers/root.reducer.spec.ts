import { _selectUserData, _selectUserLoggedIn, AuthState, State } from './root.reducer';
import { State as UserState } from './user.reducer';

describe('Auth Root Reducer', () => {
  describe('User State Selectors', () => {
    describe('_selectUserLoggedIn', () => {
      it('Should return true if uid is set', () => {
        const authState: AuthState = {
          user: {
            uid: 'some uid',
            displayName: '',
            email: '',
            photoURL: ''
          }
        };
        const state: State = { auth: authState };

        const result = _selectUserLoggedIn(state);

        expect(result).toBe(true);
      });

      it('Should return false if uid is not set', () => {
        const authState: AuthState = {
          user: {
            uid: '',
            displayName: '',
            email: '',
            photoURL: ''
          }
        };
        const state: State = { auth: authState };

        const result = _selectUserLoggedIn(state);

        expect(result).toBe(false);
      });
    });

    describe('_selectUserData', () => {
      it('Should return the user data', () => {
        const user: UserState = {
          uid: 'some uid',
          displayName: 'Jim Bob',
          email: 'jimbob@jimbob.com',
          photoURL: 'jimbob.com/jimbob.png'
        };
        const authState: AuthState = { user };
        const state: State = { auth: authState };

        const result = _selectUserData(state);

        expect(result).toEqual(user);
      });
    });
  });
});
