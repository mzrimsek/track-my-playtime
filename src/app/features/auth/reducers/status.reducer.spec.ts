import * as actions from 'features/auth/actions/status.actions';

import { reducer, State } from './status.reducer';

describe('Status Reducer', () => {
  it('Should set attemptingLogin when SetAttemptingLogin is dispatched', () => {
    const initialState: State = {
      attemptingLogin: false,
      validationMessage: ''
    };
    const newState = reducer(initialState, new actions.SetAttemptingLogin(true));
    expect(newState).toEqual({
      ...initialState,
      attemptingLogin: true
    });
  });

  it('Should set validationMessage when SetValidationMessage is dispatched', () => {
    const initialState: State = {
      attemptingLogin: false,
      validationMessage: ''
    };
    const newState = reducer(initialState, new actions.SetValidationMessage('some message'));
    expect(newState).toEqual({
      ...initialState,
      validationMessage: 'some message'
    });
  });
});
