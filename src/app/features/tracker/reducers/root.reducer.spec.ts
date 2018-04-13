import { addHours } from 'date-fns';

import { HistoryEntity, State as HistoryState } from './history.reducer';
import { State as PlatformsState } from './platforms.reducer';
import {
    _selectHistoryItems, _selectHistoryLoading, _selectPlatformsOptions, _selectSortedHistoryItems,
    _selectTimerInfo, State, TrackerState
} from './root.reducer';
import { State as TimerState } from './timer.reducer';

describe('Tracker Root Reducer', () => {
  describe('Timer State Selectors', () => {
    describe('_selectTimerInfo', () => {
      it('Should return the timer info', () => {
        const timer: TimerState = {
          game: 'some cool game',
          platform: 'some awesome platform',
          startTime: 1523563,
          active: true
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
      it('Should return an empty list when there are no items', () => {
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          history: getHistoryInitialState(),
          platforms: getPlatformsInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectHistoryItems(state);

        expect(result.length).toBe(0);
      });

      it('Should return a list with the same length as the items', () => {
        const history: HistoryState = {
          ids: ['1', '2'],
          entities: {
            '1': {
              id: '1',
              game: 'some game',
              platform: 'some platform',
              startTime: 0,
              endTime: 1000
            },
            '2': {
              id: '2',
              game: 'some other game',
              platform: 'some other platform',
              startTime: 1000,
              endTime: 2000
            }
          },
          loading: false
        };
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          history,
          platforms: getPlatformsInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectHistoryItems(state);

        expect(result.length).toBe(history.ids.length);
      });

      it('Should return a correctly mapped list', () => {
        const item1Start = new Date(0);
        const item1End = addHours(item1Start, 1);
        const item2Start = addHours(item1Start, 2);
        const item2End = addHours(item1Start, 10);
        const item1: HistoryEntity = {
          id: '1',
          game: 'some game',
          platform: 'some platform',
          startTime: item1Start.getTime(),
          endTime: item1End.getTime()
        };
        const item2: HistoryEntity = {
          id: '2',
          game: 'some other game',
          platform: 'some other platform',
          startTime: item2Start.getTime(),
          endTime: item2End.getTime()
        };
        const history: HistoryState = {
          ids: [item1.id, item2.id],
          entities: {
            [item1.id]: item1,
            [item2.id]: item2,
          },
          loading: false
        };
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          history,
          platforms: getPlatformsInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectHistoryItems(state);

        expect(result).toEqual([{
          ...item1,
          dateRange: [
            item1Start,
            item1End
          ],
        },
        {
          ...item2,
          dateRange: [
            item2Start,
            item2End
          ]
        }]);
      });
    });

    describe('_selectSortedHistoryItems', () => {
      it('Should return items in order of largest start time', () => {
        const startTime = 1000;
        const item1: HistoryEntity = {
          id: '1',
          game: 'some game',
          platform: 'some platform',
          startTime,
          endTime: startTime + 500
        };
        const item2: HistoryEntity = {
          id: '2',
          game: 'some other game',
          platform: 'some other platform',
          startTime: startTime + 2000,
          endTime: startTime + 2500
        };
        const history: HistoryState = {
          ids: [item1.id, item2.id],
          entities: {
            [item1.id]: item1,
            [item2.id]: item2,
          },
          loading: false
        };
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          history,
          platforms: getPlatformsInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectSortedHistoryItems(state);

        expect(result).toEqual([{
          ...item2,
          dateRange: [
            new Date(item2.startTime),
            new Date(item2.endTime)
          ]
        },
        {
          ...item1,
          dateRange: [
            new Date(item1.startTime),
            new Date(item1.endTime)
          ]
        }]);
      });
    });

    describe('_selectHistoryGroupingsByDate', () => {
      xit('Should return items grouped by date', () => {
        fail();
      });
    });

    describe('_selectHistoryGroupingsByPlatform', () => {
      xit('Should return items grouped by platform', () => {
        fail();
      });
    });

    describe('_selectHistoryGroupingsByGame', () => {
      xit('Should return items grouped by game', () => {
        fail();
      });
    });

    describe('_selectHistoryLoading', () => {
      it('Should return true if loading is true', () => {
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          history: {
            ids: [],
            entities: {},
            loading: true
          },
          platforms: getPlatformsInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectHistoryLoading(state);

        expect(result).toEqual(true);
      });

      it('Should return false if loading is false', () => {
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          history: {
            ids: [],
            entities: {},
            loading: false
          },
          platforms: getPlatformsInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectHistoryLoading(state);

        expect(result).toEqual(false);
      });
    });
  });
});

describe('Platforms State Selectors', () => {
  describe('_selectPlatformsOptions', () => {
    it('Should return the platforms options', () => {
      const options = ['Game Box 720', 'Nipkendo Scratch', 'Dudestation 69'];
      const trackerState: TrackerState = {
        timer: getTimerInitialState(),
        history: getHistoryInitialState(),
        platforms: {
          options
        }
      };
      const state: State = { tracker: trackerState };

      const result = _selectPlatformsOptions(state);

      expect(result).toEqual(options);
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
