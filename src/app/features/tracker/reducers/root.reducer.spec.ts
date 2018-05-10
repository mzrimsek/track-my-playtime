import { State as DisplayState } from './display.reducer';
import { State as PlatformsState } from './platforms.reducer';
import {
    _selectEntriesToShow, _selectPlatformsOptions, _selectTimerInfo, State, TrackerState
} from './root.reducer';
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
          platforms: getPlatformsInitialState(),
          display: getDisplayInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectTimerInfo(state);

        expect(result).toEqual(timer);
      });
    });
  });

  describe('Platforms State Selectors', () => {
    describe('_selectPlatformsOptions', () => {
      it('Should return the platforms options', () => {
        const options = ['Game Box 720', 'Nipkendo Scratch', 'Dudestation 69'];
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          platforms: {
            options
          },
          display: getDisplayInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectPlatformsOptions(state);

        expect(result).toEqual(options);
      });
    });
  });

  describe('Display State Selectors', () => {
    describe('_selectEntriesToShow', () => {
      it('Should return the entriesToShow', () => {
        const entriesToShow = 7;
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          platforms: getPlatformsInitialState(),
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

const getPlatformsInitialState = (): PlatformsState => {
  return {
    options: []
  };
};

const getDisplayInitialState = (): DisplayState => {
  return {
    entriesToShow: 7
  };
};
