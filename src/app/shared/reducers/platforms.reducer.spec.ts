import * as actions from '../actions/platforms.actions';

import { reducer, State } from '../reducers/platforms.reducer';

import { platforms } from '../../test-helpers';

describe('Platforms Reducer', () => {
  it('Should set options when LoadOptionsSucceeded is dispatched', () => {
    const initialState: State = {
      options: []
    };
    const options = platforms.testPlatforms;

    const newState = reducer(initialState, new actions.LoadOptionsSucceeded(options));

    expect(newState).toEqual({
      options
    });
  });
});
