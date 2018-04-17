import * as actions from '../actions/platforms.actions';

import { reducer, State } from './platforms.reducer';

describe('Platforms Reducer', () => {
  it('Should set options when Load Options Succeeded is dispatched', () => {
    const initialState: State = {
      options: []
    };
    const options = [
      'Game Box 720',
      'Nipkendo Scratch',
      'Dudestation 69'
    ];

    const newState = reducer(initialState, new actions.LoadOptionsSucceeded(options));

    expect(newState).toEqual({
      options
    });
  });
});
