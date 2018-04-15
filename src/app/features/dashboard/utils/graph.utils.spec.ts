import { HistoryGrouping } from '../../tracker/models';

import { DEFAULT_KEY, mapToGraphData } from './graph.utils';

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
});

const getHistoryGrouping = (key: string, totalTime: number): HistoryGrouping => {
  return {
    key,
    totalTime,
    historyItems: []
  };
};
