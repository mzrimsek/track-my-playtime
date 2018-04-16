import { addDays, addHours } from 'date-fns';

import { HistoryEntity, State as HistoryState } from './history.reducer';
import { State as PlatformsState } from './platforms.reducer';
import {
    _selectHistoryGroupingsByDate, _selectHistoryGroupingsByGame, _selectHistoryGroupingsByPlatform,
    _selectHistoryItems, _selectHistoryLoading, _selectPlatformsOptions, _selectSortedHistoryItems,
    _selectTimerInfo, State, TrackerState
} from './root.reducer';
import { State as TimerState } from './timer.reducer';

import { formatDate } from '../../../shared/utils/date.utils';

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
      it('Should return items grouped by start date', () => {
        const startDate = new Date();
        const item1: HistoryEntity = {
          id: '1',
          game: 'some game',
          platform: 'some platform',
          startTime: startDate.getTime(),
          endTime: startDate.getTime()
        };
        const item2: HistoryEntity = {
          id: '2',
          game: 'some other game',
          platform: 'some other platform',
          startTime: startDate.getTime(),
          endTime: startDate.getTime()
        };
        const item3: HistoryEntity = {
          id: '3',
          game: 'some other game',
          platform: 'some other platform',
          startTime: addDays(startDate, 1).getTime(),
          endTime: addDays(startDate, 1).getTime()
        };
        const history: HistoryState = {
          ids: [item1.id, item2.id, item3.id],
          entities: {
            [item1.id]: item1,
            [item2.id]: item2,
            [item3.id]: item3
          },
          loading: false
        };
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          history,
          platforms: getPlatformsInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectHistoryGroupingsByDate(state);

        expect(result).toEqual([{
          key: formatDate(addDays(startDate, 1)),
          totalTime: 0,
          historyItems: [{
            ...item3,
            dateRange: [
              addDays(startDate, 1),
              addDays(startDate, 1)
            ]
          }]
        },
        {
          key: formatDate(startDate),
          totalTime: 0,
          historyItems: [{
            ...item1,
            dateRange: [
              startDate,
              startDate
            ]
          },
          {
            ...item2,
            dateRange: [
              startDate,
              startDate
            ]
          }]
        }]);
      });
    });

    describe('_selectHistoryGroupingsByPlatform', () => {
      it('Should return items grouped by platform', () => {
        const platform = 'some platform';
        const item1: HistoryEntity = {
          id: '1',
          game: 'some game',
          platform,
          startTime: 1000,
          endTime: 1000
        };
        const item2: HistoryEntity = {
          id: '2',
          game: 'some other game',
          platform: platform + '2',
          startTime: 1000,
          endTime: 1000
        };
        const item3: HistoryEntity = {
          id: '3',
          game: 'some other game',
          platform,
          startTime: 2000,
          endTime: 2000
        };
        const history: HistoryState = {
          ids: [item1.id, item2.id, item3.id],
          entities: {
            [item1.id]: item1,
            [item2.id]: item2,
            [item3.id]: item3
          },
          loading: false
        };
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          history,
          platforms: getPlatformsInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectHistoryGroupingsByPlatform(state);

        expect(result).toEqual([{
          key: platform,
          totalTime: 0,
          historyItems: [{
            ...item3,
            dateRange: [
              new Date(2000),
              new Date(2000)
            ]
          },
          {
            ...item1,
            dateRange: [
              new Date(1000),
              new Date(1000)
            ]
          }]
        },
        {
          key: platform + '2',
          totalTime: 0,
          historyItems: [{
            ...item2,
            dateRange: [
              new Date(1000),
              new Date(1000)
            ]
          }]
        }]);
      });
    });

    describe('_selectHistoryGroupingsByGame', () => {
      it('Should return items grouped by game', () => {
        const game = 'some game';
        const item1: HistoryEntity = {
          id: '1',
          game,
          platform: 'some platform',
          startTime: 1000,
          endTime: 1000
        };
        const item2: HistoryEntity = {
          id: '2',
          game,
          platform: 'some platform',
          startTime: 2000,
          endTime: 2000
        };
        const item3: HistoryEntity = {
          id: '3',
          game: game + '2',
          platform: 'some other platform',
          startTime: 2000,
          endTime: 2000
        };
        const history: HistoryState = {
          ids: [item1.id, item2.id, item3.id],
          entities: {
            [item1.id]: item1,
            [item2.id]: item2,
            [item3.id]: item3
          },
          loading: false
        };
        const trackerState: TrackerState = {
          timer: getTimerInitialState(),
          history,
          platforms: getPlatformsInitialState()
        };
        const state: State = { tracker: trackerState };

        const result = _selectHistoryGroupingsByGame(state);

        expect(result).toEqual([{
          key: game,
          totalTime: 0,
          historyItems: [{
            ...item2,
            dateRange: [
              new Date(2000),
              new Date(2000)
            ]
          },
          {
            ...item1,
            dateRange: [
              new Date(1000),
              new Date(1000)
            ]
          }]
        },
        {
          key: game + '2',
          totalTime: 0,
          historyItems: [{
            ...item3,
            dateRange: [
              new Date(2000),
              new Date(2000)
            ]
          }]
        }]);
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

        expect(result).toBe(true);
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

        expect(result).toBe(false);
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
