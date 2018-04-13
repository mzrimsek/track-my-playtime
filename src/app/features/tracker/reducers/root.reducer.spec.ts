import { State as HistoryState } from './history.reducer';
import { State as PlatformsState } from './platforms.reducer';
import { _selectTimerInfo, State, TrackerState } from './root.reducer';
import { State as TimerState } from './timer.reducer';

describe('Tracker Root Reducer', () => {
  describe('Timer State Selectors', () => {
    describe('_selectTimerInfo', () => {
      it('Should return the timer info', () => {
        const timer: TimerState = {
          game: '',
          platform: '',
          startTime: 0,
          active: false
        };
        const trackerState: TrackerState = {
          timer,
          history: getHistoryInitialState(),
          platforms: getPlatformsInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectTimerInfo(state);

        expect(result).toEqual(timer);
      });
    });
  });

  describe('History State Selectors', () => {
    describe('_selectHistoryItems', () => {

    });
  });
});

const getTimerInitialState = (): TimerState => {
  return {
    game: '',
    platform: '',
    startTime: 0,
    active: false
  };
};

const getHistoryInitialState = (): HistoryState => {
  return {
    ids: [],
    entities: {},
    loading: false
  };
};

const getPlatformsInitialState = (): PlatformsState => {
  return {
    options: []
  };
};
