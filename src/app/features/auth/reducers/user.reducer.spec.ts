import * as actions from '../actions/user.actions';

import { reducer, State } from './user.reducer';

import { user } from '../../../test-helpers';

describe('User Reducer', () => {
  it('Should update user data when Authenticated is dispatched', () => {
    const initialState: State = {
      uid: '',
      displayName: '',
      email: '',
      photoURL: '',
      providerId: ''
    };
    const newState = reducer(initialState, new actions.Authenticated(user.mockUser));
    expect(newState).toEqual(user.mockUser);
  });

  it('Should clear user data when NotAuthenticated is dispatched', () => {
    const initialState: State = {
      ...user.mockUser
    };
    const notAuthenticatedAction = new actions.NotAuthenticated();

    const newState = reducer(initialState, notAuthenticatedAction);

    expect(newState).toEqual({
      uid: '',
      displayName: '',
      email: '',
      photoURL: '',
      providerId: ''
    });
  });
});
