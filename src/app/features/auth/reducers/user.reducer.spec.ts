import * as actions from '../actions/user.actions';

import { reducer, State } from './user.reducer';

import { User } from '../models';

describe('User Reducer', () => {
  it('Should update user data when Authenticated is dispatched', () => {
    const initialState: State = {
      uid: '',
      displayName: '',
      email: '',
      photoURL: ''
    };
    const user: User = {
      uid: 'some uid',
      displayName: 'Jim Bob',
      email: 'jimbob@jimbob.com',
      photoURL: 'jimbob.com/jimbob.png'
    };

    const newState = reducer(initialState, new actions.Authenticated(user));

    expect(newState).toEqual(user);
  });

  it('Should clear user data when Not Authenticated is dispatched', () => {
    const initialState: State = {
      uid: 'some uid',
      displayName: 'Jim Bob',
      email: 'jimbob@jimbob.com',
      photoURL: 'jimbob.com/jimbob.png'
    };
    const notAuthenticatedAction = new actions.NotAuthenticated();

    const newState = reducer(initialState, notAuthenticatedAction);

    expect(newState).toEqual({
      uid: '',
      displayName: '',
      email: '',
      photoURL: ''
    });
  });
});
