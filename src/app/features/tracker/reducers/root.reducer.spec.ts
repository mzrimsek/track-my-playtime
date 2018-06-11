import { State as DisplayState } from './display.reducer';
import { _selectEntriesToShow, _selectTimerInfo, State, TrackerState } from './root.reducer';
import { State as TimerState } from './timer.reducer';

describe('Tracker Root Reducer', () => {
  describe('Timer State Selectors', () => {
    describe('_selectTimerInfo', () => {
      it('Should return the timer info', () => {
        const timer: TimerState = {
          game: 'some cool game',
          platform: 'some awesome platform',
          startTime: 1523563
        };
        const trackerState: TrackerState = {
          timer,
          display: getDisplayInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectTimerInfo(state);

        expect(result).toEqual(timer);
      });
    });
  });

  describe('Display State Selectors', () => {
    describe('_selectEntriesToShow', () => {
      it('Should return the entriesToShow', () => {
        const entriesToShow = 7;
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          display: {
            entriesToShow
          }
        };
        const state: State = { tracker: trackerState };

        const result = _selectEntriesToShow(state);

        expect(result).toBe(entriesToShow);
      });
    });
  });
});

const getTimerInitialState = (): TimerState => {
  return {
    game: '',
    platform: '',
    startTime: 0
  };
};

const getDisplayInitialState = (): DisplayState => {
  return {
    entriesToShow: 7
  };
};
