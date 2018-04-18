import * as actions from '../actions/timer.actions';

import { reducer, State } from './timer.reducer';

import { TimerInfo } from '../models';

describe('Timer Reducer', () => {
  it('Should clear timer info when Reset Time is dispatched', () => {
    const initialState: State = {
      game: 'some game',
      platform: 'an awesome platform',
      startTime: 1234541
    };
    const newState = reducer(initialState, new actions.ResetTimer());
    expect(newState).toEqual({
      game: '',
      platform: '',
      startTime: 0
    });
  });

  it('Should update game when Set Game is dispatched', () => {
    const initialState: State = {
      game: 'some game',
      platform: 'an awesome platform',
      startTime: 1234541
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
      startTime: 1234541
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
      startTime: 1234541
    };
    const startTime = 15;

    const newState = reducer(initialState, new actions.SetStartTime(startTime));

    expect(newState).toEqual({
      ...initialState,
      startTime
    });
  });

  it('Should set timer info when Load Timer Info Succeeded is dispatched', () => {
    const initialState: State = {
      game: '',
      platform: '',
      startTime: 0
    };
    const timerInfo: TimerInfo = {
      game: 'some game',
      platform: 'some platform',
      startTime: 30000
    };

    const newState = reducer(initialState, new actions.LoadTimerInfoSucceeded(timerInfo));

    expect(newState).toEqual(timerInfo);
  });
});
