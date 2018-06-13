import * as actions from '../actions/add-playing.actions';

import { reducer, State } from './add-playing.reducer';

describe('Playing Reducer', () => {
  it('Should set game when SetGame is dispatched', () => {
    const initialState: State = {
      game: '',
      platform: '',
      startTime: 0
    };
    const game = 'some game';

    const result = reducer(initialState, new actions.SetGame(game));

    expect(result).toEqual({
      ...initialState,
      game
    });
  });

  it('Should set platform when SetPlatform is dispatched', () => {
    const initialState: State = {
      game: '',
      platform: '',
      startTime: 0
    };
    const platform = 'some platform';

    const result = reducer(initialState, new actions.SetPlatform(platform));

    expect(result).toEqual({
      ...initialState,
      platform
    });
  });

  it('Should set startTime when SetStartTime is dispatched', () => {
    const initialState: State = {
      game: '',
      platform: '',
      startTime: 0
    };
    const startTime = 5000;

    const result = reducer(initialState, new actions.SetStartTime(startTime));

    expect(result).toEqual({
      ...initialState,
      startTime
    });
  });

  it('Should set to initialState when Reset is dispatched', () => {
    const initialState: State = {
      game: 'some game',
      platform: 'some platform',
      startTime: 241235
    };
    const result = reducer(initialState, new actions.Reset());
    expect(result).toEqual({
      game: '',
      platform: '',
      startTime: 0
    });
  });
});
