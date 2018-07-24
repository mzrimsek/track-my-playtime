import { addDays, eachDay } from 'date-fns';

import { HistoryGrouping } from '../../../shared/models';
import { GraphDataItem } from '../models';

import { DEFAULT_KEY, mapToGraphData, padDateGraphData, sortGraphDataByValue } from './graph.utils';

import { history } from '../../../test-helpers';

describe('Graph Utils', () => {
  describe('mapToGraphData', () => {
    it('Can map an empty list', () => {
      const groupings: HistoryGrouping[] = [];
      const result = mapToGraphData(groupings);
      expect(result.length).toBe(0);
    });

    it('Can map a list with items', () => {
      const key = 'Some Key';
      const grouping1 = history.getHistoryGrouping(key, 2000);
      const grouping2 = history.getHistoryGrouping(key, 800);
      const grouping3 = history.getHistoryGrouping(key, 12345);
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
        const grouping = history.getHistoryGrouping(key, 2000);

        const result = mapToGraphData([grouping]);

        expect(result[0].name).toBe(key);
      });

      it('Should set the key to the default value when the key is empty', () => {
        const key = '';
        const grouping = history.getHistoryGrouping(key, 2000);

        const result = mapToGraphData([grouping]);

        expect(result[0].name).toBe(DEFAULT_KEY);
      });

      it('Should set the total time', () => {
        const totalTime = 2000;
        const grouping = history.getHistoryGrouping('some key', totalTime);

        const result = mapToGraphData([grouping]);

        expect(result[0].value).toBe(totalTime);
      });
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

  describe('sortGraphDataByValue', () => {
    it('Should return sorted data', () => {
      const items: GraphDataItem[] = [{
        name: 'Game 1',
        value: 1000
      }, {
        name: 'Game 2',
        value: 2000
      }, {
        name: 'Game 3',
        value: 500
      }];
      const result = sortGraphDataByValue(items);
      expect(result).toEqual([{
        name: 'Game 2',
        value: 2000
      }, {
        name: 'Game 1',
        value: 1000
      }, {
        name: 'Game 3',
        value: 500
      }]);
    });
  });
});
