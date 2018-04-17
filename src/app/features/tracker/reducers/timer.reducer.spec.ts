import * as actions from '../actions/timer.actions';

import { reducer, State } from './timer.reducer';

describe('Timer Reducer', () => {
  it('Should set start time and active when Start Time is dispatched', () => {
    const initialState: State = {
      game: '',
      platform: '',
      startTime: 0,
      active: false
    };
    const startTime = 1234;

    const newState = reducer(initialState, new actions.StartTimer(startTime));

    expect(newState).toEqual({
      ...initialState,
      startTime,
      active: true
    });
  });

  it('Should clear timer info when Reset Time is dispatched', () => {
    const initialState: State = {
      game: 'some game',
      platform: 'an awesome platform',
      startTime: 1234541,
      active: true
    };
    const newState = reducer(initialState, new actions.ResetTimer());
    expect(newState).toEqual({
      game: '',
      platform: '',
      startTime: 0,
      active: false
    });
  });

  it('Should update game when Set Game is dispatched', () => {
    const initialState: State = {
      game: 'some game',
      platform: 'an awesome platform',
      startTime: 1234541,
      active: true
    };
    const game = 'some different game';

    const newState = reducer(initialState, new actions.SetGame(game));

    expect(newState).toEqual({
      ...initialState,
      game
    });
  });

  it('Should update platform when Set Platform is dispatched', () => {
    const initialState: State = {
      game: 'some game',
      platform: 'an awesome platform',
      startTime: 1234541,
      active: true
    };
    const platform = 'some different platform';

    const newState = reducer(initialState, new actions.SetPlatform(platform));

    expect(newState).toEqual({
      ...initialState,
      platform
    });
  });

  it('Should update start time when Set Start Time is dispatched', () => {
    const initialState: State = {
      game: 'some game',
      platform: 'an awesome platform',
      startTime: 1234541,
      active: true
    };
    const startTime = 15;

    const newState = reducer(initialState, new actions.SetStartTime(startTime));

    expect(newState).toEqual({
      ...initialState,
      startTime
    });
  });
});
