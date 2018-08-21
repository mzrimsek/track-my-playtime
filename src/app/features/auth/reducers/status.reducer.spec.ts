import * as appActions from '../../../actions/app.actions';
import * as actions from '../actions/user.actions';

import { reducer, State } from './status.reducer';

import { EMAIL_IN_USE } from '../utils/validation.utils';

import { user } from '../../../test-helpers';

describe('Status Reducer', () => {
  it('Should set attemptingLogin to true when EmailLogin is dispatched', () => {
    const initialState: State = {
      attemptingLogin: false,
      validationMessage: ''
    };
    const newState = reducer(initialState, new actions.EmailLogin('', ''));
    expect(newState).toEqual({
      ...initialState,
      attemptingLogin: true
    });
  });

  it('Should set attemptingLogin to true when SignUp is dispatched', () => {
    const initialState: State = {
      attemptingLogin: false,
      validationMessage: ''
    };
    const newState = reducer(initialState, new actions.SignUp('', ''));
    expect(newState).toEqual({
      ...initialState,
      attemptingLogin: true
    });
  });

  it('Should set attemptingLogin to true when GoogleLogin is dispatched', () => {
    const initialState: State = {
      attemptingLogin: false,
      validationMessage: ''
    };
    const newState = reducer(initialState, new actions.GoogleLogin());
    expect(newState).toEqual({
      ...initialState,
      attemptingLogin: true
    });
  });

  it('Should set attemptingLogin to true when FacebookLogin is dispatched', () => {
    const initialState: State = {
      attemptingLogin: false,
      validationMessage: ''
    };
    const newState = reducer(initialState, new actions.FacebookLogin());
    expect(newState).toEqual({
      ...initialState,
      attemptingLogin: true
    });
  });

  it('Should set attemptingLogin to false when Authenticated is dispatched', () => {
    const initialState: State = {
      attemptingLogin: true,
      validationMessage: ''
    };
    const newState = reducer(initialState, new actions.Authenticated(user.mockUser));
    expect(newState).toEqual({
      ...initialState,
      attemptingLogin: false
    });
  });

  it('Should set attemptingLogin to false when NotAuthenticated is dispatched', () => {
    const initialState: State = {
      attemptingLogin: true,
      validationMessage: ''
    };
    const newState = reducer(initialState, new actions.NotAuthenticated());
    expect(newState).toEqual({
      ...initialState,
      attemptingLogin: false
    });
  });

  describe('When Error is dispatched', () => {
    it('Should set attemptingLogin to false', () => {
      const initialState: State = {
        attemptingLogin: true,
        validationMessage: ''
      };
      const newState = reducer(initialState, new appActions.Error(actions.GET_USER, ''));
      expect(newState).toEqual({
        ...initialState,
        attemptingLogin: false
      });
    });

    it('Should set validationMessage when there is a handled error', () => {
      const initialState: State = {
        attemptingLogin: false,
        validationMessage: 'some message'
      };
      const newState = reducer(initialState, new appActions.Error(actions.SIGNUP, ''));
      expect(newState).toEqual({
        ...initialState,
        validationMessage: EMAIL_IN_USE
      });
    });

    it('Should set validationMessage to empty when there is not a handled error', () => {
      const initialState: State = {
        attemptingLogin: false,
        validationMessage: 'some message'
      };
      const newState = reducer(initialState, new appActions.Error(actions.GET_USER, ''));
      expect(newState).toEqual({
        ...initialState,
        validationMessage: ''
      });
    });
  });
});
