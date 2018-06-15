import { HistoryGrouping, HistoryListItem } from '../../../shared/models';

import { getHistoryListItemMap, HistoryListItemMap } from './playing.utils';

describe('Playing Utils', () => {
  describe('getHistoryListItemMap', () => {
    it('Should return empty when there are no groupings', () => {
      const result = getHistoryListItemMap([]);
      expect(result).toEqual(new Map<string, HistoryListItem>());
    });

    it('Should return correct map when there are groupings', () => {
      const expected: HistoryListItemMap = new Map<string, HistoryListItem>();
      expected.set('3', {
        id: '3',
        game: testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(5000), new Date(6000)]
      });
      expected.set('2', {
        id: '2',
        game: testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)]
      });
      expected.set('1', {
        id: '1',
        game: testGame,
        platform: 'Platform 2',
        startTime: 1000,
        endTime: 2000,
        dateRange: [new Date(1000), new Date(2000)]
      });
      const result = getHistoryListItemMap(testGroupings);
      expect(result).toEqual(expected);
    });
  });

  describe('filterGameGrouping', () => {
    it('Should return empty if there are no groupings', () => {
      fail();
    });

    it('Should return empty if there are groupings but no match', () => {
      fail();
    });

    it('Should return correctly filtered items when there is a match', () => {
      fail();
    });
  });

  describe('getPlayingItem', () => {
    it('Should return correct data', () => {
      fail();
    });
  });

  describe('getPlayingDisplayData', () => {
    it('Should return correct data', () => {
      fail();
    });
  });
});

const testGame = 'Game 1';
const testGroupings: HistoryGrouping[] = [{
  key: testGame,
  historyItems: [{
    id: '3',
    game: testGame,
    platform: 'Platform 1',
    startTime: 5000,
    endTime: 6000,
    dateRange: [new Date(5000), new Date(6000)]
  }, {
    id: '2',
    game: testGame,
    platform: 'Platform 1',
    startTime: 3000,
    endTime: 4000,
    dateRange: [new Date(3000), new Date(4000)]
  }, {
    id: '1',
    game: testGame,
    platform: 'Platform 2',
    startTime: 1000,
    endTime: 2000,
    dateRange: [new Date(1000), new Date(2000)]
  }],
  totalTime: 3
}];

