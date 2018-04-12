import { HistoryGrouping } from '../../tracker/models';

import { mapToGraphData } from './graph.utils';

describe('Graph Utils', () => {
  describe('mapToGraphData', () => {
    it('Can map an empty list', () => {
      const groupings: HistoryGrouping[] = [];
      const result = mapToGraphData(groupings);
      expect(result.length).toBe(0);
    });

    it('Can map a list with a single item', () => {
      const key = 'Some Key';
      const totalTime = 10000;
      const groupings = [getHistoryGrouping(key, totalTime)];

      const result = mapToGraphData(groupings);

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({
        name: key,
        value: totalTime
      });
    });

    it('Can map a list with several items', () => {
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
  });
});

const getHistoryGrouping = (key: string, totalTime: number): HistoryGrouping => {
  return {
    key,
    totalTime,
    historyItems: []
  };
};
