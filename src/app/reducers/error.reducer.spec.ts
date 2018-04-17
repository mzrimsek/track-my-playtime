import * as actions from '../actions/app.actions';

import { reducer, State } from './error.reducer';

describe('Error Reducer', () => {
  it('Should set error details', () => {
    const initialState: State = {
      action: '',
      message: ''
    };
    const action = 'Add New Item';
    const message = 'Something went terribly wrong';

    const newState = reducer(initialState, new actions.Error(action, message));

    expect(newState).toEqual({
      action,
      message
    });
  });
});
