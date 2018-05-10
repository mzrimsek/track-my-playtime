import { addDays, eachDay, subDays } from 'date-fns';

import { HistoryGrouping } from '../../../shared/models';
import { GraphDataItem } from '../models';

import {
    DEFAULT_KEY, filterGroupingsByDateRange, mapToGraphData, padDateGraphData
} from './graph.utils';

describe('Graph Utils', () => {
  describe('mapToGraphData', () => {
    it('Can map an empty list', () => {
      const groupings: HistoryGrouping[] = [];
      const result = mapToGraphData(groupings);
      expect(result.length).toBe(0);
    });

    it('Can map a list with items', () => {
      const key = 'Some Key';
      const grouping1 = getHistoryGrouping(key, 2000);
      const grouping2 = getHistoryGrouping(key, 800);
      const grouping3 = getHistoryGrouping(key, 12345);
      const groupings = [grouping1, grouping2, grouping3];

      const result = mapToGraphData(groupings);

      expect(result.length).toBe(3);
      expect(result[0]).toEqual({
        name: grouping1.key,
        value: grouping1.totalTime
      });
      expect(result[1]).toEqual({
        name: grouping2.key,
        value: grouping2.totalTime
      });
      expect(result[2]).toEqual({
        name: grouping3.key,
        value: grouping3.totalTime
      });
    });

    describe('Builds each graph data item correctly', () => {
      it('Should set the key', () => {
        const key = 'Some Key';
        const grouping = getHistoryGrouping(key, 2000);

        const result = mapToGraphData([grouping]);

        expect(result[0].name).toBe(key);
      });

      it('Should set the key to the default value when the key is empty', () => {
        const key = '';
        const grouping = getHistoryGrouping(key, 2000);

        const result = mapToGraphData([grouping]);

        expect(result[0].name).toBe(DEFAULT_KEY);
      });

      it('Should set the total time', () => {
        const totalTime = 2000;
        const grouping = getHistoryGrouping('some key', totalTime);

        const result = mapToGraphData([grouping]);

        expect(result[0].value).toBe(totalTime);
      });
    });
  });

  describe('filterGroupingsByDateRange', () => {
    const start = new Date(2018, 3, 1);
    const end = addDays(start, 6);
    const inRange = addDays(start, 3);
    const outOfRangeAhead = addDays(start, 15);
    const outOfRangeBehind = subDays(start, 3);
    const range = eachDay(start, end);
    const game = 'some game';

    it('Should filter history items outside of date range', () => {
      const grouping = getHistoryGrouping(game, 0);
      grouping.historyItems = [{
        id: 'some id 4',
        game,
        platform: 'some platform',
        startTime: outOfRangeAhead.getTime(),
        endTime: outOfRangeAhead.getTime(),
        dateRange: [
          outOfRangeAhead,
          outOfRangeAhead
        ]
      }, {
        id: 'some id 3',
        game,
        platform: 'some platform',
        startTime: inRange.getTime(),
        endTime: inRange.getTime(),
        dateRange: [
          inRange,
          inRange
        ]
      }, {
        id: 'some id 2',
        game,
        platform: 'some platform',
        startTime: start.getTime(),
        endTime: start.getTime(),
        dateRange: [
          start,
          start
        ]
      }, {
        id: 'some id',
        game,
        platform: 'some other platform',
        startTime: outOfRangeBehind.getTime(),
        endTime: outOfRangeBehind.getTime(),
        dateRange: [
          outOfRangeBehind,
          outOfRangeBehind
        ]
      }];

      const result = filterGroupingsByDateRange([grouping], range);

      expect(result).toEqual([{
        key: game,
        totalTime: 0,
        historyItems: [{
          id: 'some id 3',
          game,
          platform: 'some platform',
          startTime: inRange.getTime(),
          endTime: inRange.getTime(),
          dateRange: [
            inRange,
            inRange
          ]
        }, {
          id: 'some id 2',
          game,
          platform: 'some platform',
          startTime: start.getTime(),
          endTime: start.getTime(),
          dateRange: [
            start,
            start
          ]
        }]
      }]);
    });

    it('Should update total time', () => {
      const grouping = getHistoryGrouping(game, 7000);
      grouping.historyItems = [{
        id: 'some id 4',
        game,
        platform: 'some platform',
        startTime: outOfRangeAhead.getTime(),
        endTime: outOfRangeAhead.getTime() + 2000,
        dateRange: [
          outOfRangeAhead,
          new Date(outOfRangeAhead.getTime() + 2000)
        ]
      }, {
        id: 'some id 3',
        game,
        platform: 'some platform',
        startTime: inRange.getTime(),
        endTime: inRange.getTime() + 1000,
        dateRange: [
          inRange,
          new Date(inRange.getTime() + 1000)
        ]
      }, {
        id: 'some id 2',
        game,
        platform: 'some platform',
        startTime: start.getTime(),
        endTime: start.getTime() + 1000,
        dateRange: [
          start,
          new Date(start.getTime() + 1000)
        ]
      }, {
        id: 'some id',
        game,
        platform: 'some other platform',
        startTime: outOfRangeBehind.getTime(),
        endTime: outOfRangeBehind.getTime() + 3000,
        dateRange: [
          outOfRangeBehind,
          new Date(outOfRangeBehind.getTime() + 3000)
        ]
      }];

      const result = filterGroupingsByDateRange([grouping], range);

      expect(result).toEqual([{
        key: game,
        totalTime: 2, // time on history items is in milliseconds; total time is in seconds
        historyItems: [{
          id: 'some id 3',
          game,
          platform: 'some platform',
          startTime: inRange.getTime(),
          endTime: inRange.getTime() + 1000,
          dateRange: [
            inRange,
            new Date(inRange.getTime() + 1000)
          ]
        }, {
          id: 'some id 2',
          game,
          platform: 'some platform',
          startTime: start.getTime(),
          endTime: start.getTime() + 1000,
          dateRange: [
            start,
            new Date(start.getTime() + 1000)
          ]
        }]
      }]);
    });
  });

  describe('padDateGraphData', () => {
    it('Should add empty data items where none exist in the date range', () => {
      const items: GraphDataItem[] = [{
        name: '4/3/2018',
        value: 1000
      }, {
        name: '4/5/2018',
        value: 2000
      }, {
        name: '4/6/2018',
        value: 500
      }];
      const start = new Date(2018, 3, 1);
      const end = addDays(start, 6);
      const range = eachDay(start, end);

      const result = padDateGraphData(items, range);

      expect(result).toEqual([{
        name: '4/1/2018',
        value: 0
      }, {
        name: '4/2/2018',
        value: 0
      }, {
        name: '4/3/2018',
        value: 1000
      }, {
        name: '4/4/2018',
        value: 0
      }, {
        name: '4/5/2018',
        value: 2000
      }, {
        name: '4/6/2018',
        value: 500
      }, {
        name: '4/7/2018',
        value: 0
      }]);
    });
  });
});

const getHistoryGrouping = (key: string, totalTime: number): HistoryGrouping => {
  return {
    key,
    totalTime,
    historyItems: []
  };
};
