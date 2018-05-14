import * as actions from '../actions/display.actions';

import { reducer, State } from './display.reducer';

describe('Display Reducer', () => {
  it('Should increment daysToShow when IncrementDaysToShow is dispatched', () => {
    const initialState: State = {
      entriesToShow: 12
    };
    const newState = reducer(initialState, new actions.IncrementDaysToShow(6));
    expect(newState).toEqual({
      entriesToShow: 18
    });
  });
});
