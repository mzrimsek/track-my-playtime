import { startOfDay, subDays } from 'date-fns';

import { State as DisplayState } from './display.reducer';
import { State as PlatformsState } from './platforms.reducer';
import {
    _selectDateListToShow, _selectDaysToShow, _selectPlatformsOptions, _selectTimerInfo, State,
    TrackerState
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
    describe('_selectDaysToShow', () => {
      it('Should return the daysToShow', () => {
        const daysToShow = 7;
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          platforms: getPlatformsInitialState(),
          display: {
            daysToShow
          }
        };
        const state: State = { tracker: trackerState };

        const result = _selectDaysToShow(state);

        expect(result).toBe(daysToShow);
      });
    });

    describe('_selectDateListToShow', () => {
      it('Should return same number of entries as daysToShow', () => {
        const daysToShow = 7;
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          platforms: getPlatformsInitialState(),
          display: {
            daysToShow
          }
        };
        const state: State = { tracker: trackerState };

        const result = _selectDateListToShow(state);

        expect(result.length).toBe(daysToShow);
      });
      it('Should return the dates to show', () => {
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          platforms: getPlatformsInitialState(),
          display: {
            daysToShow: 7
          }
        };
        const state: State = { tracker: trackerState };

        const result = _selectDateListToShow(state);

        const today = startOfDay(new Date());
        expect(result).toEqual([
          today,
          subDays(today, 1),
          subDays(today, 2),
          subDays(today, 3),
          subDays(today, 4),
          subDays(today, 5),
          subDays(today, 6)
        ]);
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
    daysToShow: 7
  };
};
