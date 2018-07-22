import { HistoryGrouping, HistoryListItem } from '../models';

import {
    filterHistoryItemsAfter, filterHistoryItemsBetween, filterPlatforms, filterStartTimes,
    getUniqueFrom
} from './history-filter.utils';

describe('History Filter Utils', () => {
  describe('getUniqueFrom', () => {
    it('Should return list of unique games', () => {
      const items: HistoryListItem[] = [
        getHistoryListItem('Game 3', ''),
        getHistoryListItem('Game 1', ''),
        getHistoryListItem('Game 1', ''),
        getHistoryListItem('Game 2', '')
      ];
      const result = getUniqueFrom(items, item => item.game);
      expect(result).toEqual(['Game 3', 'Game 1', 'Game 2']);
    });

    it('Should return list of unique games', () => {
      const items: HistoryListItem[] = [
        getHistoryListItem('', 'Platform 1'),
        getHistoryListItem('', 'Platform 3'),
        getHistoryListItem('', 'Platform 2'),
        getHistoryListItem('', 'Platform 3')
      ];
      const result = getUniqueFrom(items, item => item.platform);
      expect(result).toEqual(['Platform 1', 'Platform 3', 'Platform 2']);
    });
  });

  describe('filterPlatforms', () => {
    it('Should return empty when no groupings', () => {
      const result = filterPlatforms([], null);
      expect(result).toEqual([]);
    });

    it('Should return empty when game is empty string', () => {
      const groupings: HistoryGrouping[] = [
        getHistoryGrouping('Game 1', 0)
      ];
      const result = filterPlatforms(groupings, '');
      expect(result).toEqual([]);
    });

    it('Should return empty when game is null', () => {
      const groupings: HistoryGrouping[] = [
        getHistoryGrouping('Game 1', 0)
      ];
      const result = filterPlatforms(groupings, null);
      expect(result).toEqual([]);
    });

    it('Should return empty when game does not match', () => {
      const groupings: HistoryGrouping[] = [
        getHistoryGrouping('Game 1', 0)
      ];
      const result = filterPlatforms(groupings, 'Not Game 1');
      expect(result).toEqual([]);
    });

    it('Should return unqiue platforms when game matches', () => {
      const grouping = getHistoryGrouping(testGame, 0);
      grouping.historyItems = [
        getHistoryListItem(testGame, 'Some platform'),
        getHistoryListItem(testGame, 'Some platform'),
        getHistoryListItem(testGame, 'Some other platform')
      ];
      const groupings: HistoryGrouping[] = [grouping];

      const result = filterPlatforms(groupings, testGame);

      expect(result).toEqual(['Some platform', 'Some other platform']);
    });
  });

  describe('filterStartTimes', () => {
    it('Should return empty when no groupings', () => {
      const result = filterStartTimes([], null, '');
      expect(result).toEqual([]);
    });

    it('Should return empty when game is empty string', () => {
      const groupings: HistoryGrouping[] = [
        getHistoryGrouping('Game 1', 0)
      ];
      const result = filterStartTimes(groupings, '', '');
      expect(result).toEqual([]);
    });

    it('Should return empty when game is null', () => {
      const groupings: HistoryGrouping[] = [
        getHistoryGrouping('Game 1', 0)
      ];
      const result = filterStartTimes(groupings, null, '');
      expect(result).toEqual([]);
    });

    it('Should return empty when game does not match', () => {
      const groupings: HistoryGrouping[] = [
        getHistoryGrouping('Game 1', 0)
      ];
      const result = filterStartTimes(groupings, 'Not Game 1', '');
      expect(result).toEqual([]);
    });

    it('Should return empty when game matches but platform does not', () => {
      const grouping = getHistoryGrouping(testGame, 2);
      grouping.historyItems = [
        getHistoryListItem(testGame, 'Some other platform', 6000, 8000)
      ];
      const groupings: HistoryGrouping[] = [grouping];

      const result = filterStartTimes(groupings, testGame, 'Some platform');

      expect(result).toEqual([]);
    });

    it('Should return unqiue start times when game and platform matches', () => {
      const grouping = getHistoryGrouping(testGame, 6.5);
      grouping.historyItems = [
        getHistoryListItem(testGame, 'Some other platform', 6000, 8000),
        getHistoryListItem(testGame, 'Some platform', 1000, 5000),
        getHistoryListItem(testGame, 'Some platform', 100, 800)
      ];
      const groupings: HistoryGrouping[] = [grouping];

      const result = filterStartTimes(groupings, testGame, 'Some platform');

      expect(result).toEqual([100, 1000]);
    });
  });

  describe('filterHistoryItemsAfter', () => {
    it('Should return empty if grouping is undefined', () => {
      const result = filterHistoryItemsAfter(undefined, {
        id: 'some id',
        game: testGame,
        platform: 'Platform 1',
        startTime: 6000,
        endTime: 9000,
        dateRange: [new Date(6000), new Date(9000)],
        locked: false
      });
      expect(result.length).toBe(0);
    });

    it('Should return empty if there is no grouping', () => {
      const result = filterHistoryItemsAfter({
        key: testGame,
        historyItems: [],
        totalTime: 0
      }, {
          id: 'some id',
          game: testGame,
          platform: 'Platform 1',
          startTime: 6000,
          endTime: 9000,
          dateRange: [new Date(6000), new Date(9000)],
          locked: false
        });
      expect(result.length).toBe(0);
    });

    it('Should return empty if there is a grouping but no match', () => {
      const result = filterHistoryItemsAfter(testGroupings[0], {
        id: 'some id',
        game: testGame,
        platform: 'Platform 1',
        startTime: 9000,
        endTime: 10000,
        dateRange: [new Date(9000), new Date(10000)],
        locked: false
      });
      expect(result.length).toBe(0);
    });

    it('Should return correctly filtered items when there is a match', () => {
      const result = filterHistoryItemsAfter(testGroupings[0], {
        id: 'some id',
        game: testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)],
        locked: false
      });
      expect(result).toEqual([{
        id: '4',
        game: testGame,
        platform: 'Platform 1',
        startTime: 8000,
        endTime: 9000,
        dateRange: [new Date(8000), new Date(9000)],
        locked: false
      }, {
        id: '3',
        game: testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(5000), new Date(6000)],
        locked: false
      }, {
        id: '2',
        game: testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)],
        locked: false
      }]);
    });
  });

  describe('filterHistoryItemsBetween', () => {
    it('Should return empty if grouping is undefined', () => {
      const result = filterHistoryItemsBetween(undefined, {
        id: 'some id',
        game: testGame,
        platform: 'Platform 1',
        startTime: 6000,
        endTime: 9000,
        dateRange: [new Date(6000), new Date(9000)],
        locked: false
      }, {
          id: 'some id 2',
          game: testGame,
          platform: 'Platform 1',
          startTime: 10000,
          endTime: 12000,
          dateRange: [new Date(10000), new Date(12000)],
          locked: false
        });
      expect(result.length).toBe(0);
    });

    it('Should return empty if there is no grouping', () => {
      const result = filterHistoryItemsBetween({
        key: testGame,
        historyItems: [],
        totalTime: 0
      }, {
          id: 'some id',
          game: testGame,
          platform: 'Platform 1',
          startTime: 6000,
          endTime: 9000,
          dateRange: [new Date(6000), new Date(9000)],
          locked: false
        }, {
          id: 'some id 2',
          game: testGame,
          platform: 'Platform 1',
          startTime: 10000,
          endTime: 12000,
          dateRange: [new Date(10000), new Date(12000)],
          locked: false
        });
      expect(result.length).toBe(0);
    });

    it('Should return empty if there is a grouping but no match for start', () => {
      const result = filterHistoryItemsBetween(testGroupings[0], {
        id: 'some id',
        game: testGame,
        platform: 'Platform 1',
        startTime: 9000,
        endTime: 10000,
        dateRange: [new Date(9000), new Date(10000)],
        locked: false
      }, {
          id: 'some id 2',
          game: testGame,
          platform: 'Platform 1',
          startTime: 10000,
          endTime: 12000,
          dateRange: [new Date(10000), new Date(12000)],
          locked: false
        });
      expect(result.length).toBe(0);
    });

    it('Should return correctly filtered items when there is a match start', () => {
      const result = filterHistoryItemsBetween(testGroupings[0], {
        id: 'some id',
        game: testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)],
        locked: false
      }, {
          id: 'some id 2',
          game: testGame,
          platform: 'Platform 1',
          startTime: 4000,
          endTime: 6000,
          dateRange: [new Date(4000), new Date(6000)],
          locked: false
        });
      expect(result).toEqual([{
        id: '3',
        game: testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(5000), new Date(6000)],
        locked: false
      }, {
        id: '2',
        game: testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)],
        locked: false
      }]);
    });
  });
});

const testGame = 'Game 1';

const getHistoryListItem = (game: string, platform: string, startTime = 0, endTime = 0): HistoryListItem => {
  return <HistoryListItem>{
    id: 'totally a unique id',
    game,
    platform,
    startTime,
    endTime,
    dateRange: [new Date(startTime), new Date(endTime)],
    locked: false
  };
};

const getHistoryGrouping = (key: string, totalTime: number): HistoryGrouping => {
  return {
    key,
    totalTime,
    historyItems: []
  };
};

const testGroupings: HistoryGrouping[] = [{
  key: testGame,
  historyItems: [{
    id: '4',
    game: testGame,
    platform: 'Platform 1',
    startTime: 8000,
    endTime: 9000,
    dateRange: [new Date(8000), new Date(9000)],
    locked: false
  }, {
    id: '3',
    game: testGame,
    platform: 'Platform 1',
    startTime: 5000,
    endTime: 6000,
    dateRange: [new Date(5000), new Date(6000)],
    locked: false
  }, {
    id: '2',
    game: testGame,
    platform: 'Platform 1',
    startTime: 3000,
    endTime: 4000,
    dateRange: [new Date(3000), new Date(4000)],
    locked: false
  }, {
    id: '1',
    game: testGame,
    platform: 'Platform 2',
    startTime: 1000,
    endTime: 2000,
    dateRange: [new Date(1000), new Date(2000)],
    locked: false
  }],
  totalTime: 3
}];
