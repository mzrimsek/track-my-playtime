import { HistoryGrouping, HistoryListItem } from 'shared/models';

import {
    filterHistoryItemsAfter, filterHistoryItemsBetween, filterPlatforms, filterStartTimes,
    getUniqueFrom
} from './history-filter.utils';

import { history } from '../../test-helpers';

describe('History Filter Utils', () => {
  describe('getUniqueFrom', () => {
    it('Should return list of unique games', () => {
      const items: HistoryListItem[] = [
        history.getHistoryListItem('Game 3', ''),
        history.getHistoryListItem('Game 1', ''),
        history.getHistoryListItem('Game 1', ''),
        history.getHistoryListItem('Game 2', '')
      ];
      const result = getUniqueFrom(items, item => item.game);
      expect(result).toEqual(['Game 3', 'Game 1', 'Game 2']);
    });

    it('Should return list of unique games', () => {
      const items: HistoryListItem[] = [
        history.getHistoryListItem('', 'Platform 1'),
        history.getHistoryListItem('', 'Platform 3'),
        history.getHistoryListItem('', 'Platform 2'),
        history.getHistoryListItem('', 'Platform 3')
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
        history.getHistoryGrouping('Game 1', 0)
      ];
      const result = filterPlatforms(groupings, '');
      expect(result).toEqual([]);
    });

    it('Should return empty when game is null', () => {
      const groupings: HistoryGrouping[] = [
        history.getHistoryGrouping('Game 1', 0)
      ];
      const result = filterPlatforms(groupings, null);
      expect(result).toEqual([]);
    });

    it('Should return empty when game does not match', () => {
      const groupings: HistoryGrouping[] = [
        history.getHistoryGrouping('Game 1', 0)
      ];
      const result = filterPlatforms(groupings, 'Not Game 1');
      expect(result).toEqual([]);
    });

    it('Should return unqiue platforms when game matches', () => {
      const grouping = history.getHistoryGrouping(history.testGame, 0);
      grouping.historyItems = [
        history.getHistoryListItem(history.testGame, 'Some platform'),
        history.getHistoryListItem(history.testGame, 'Some platform'),
        history.getHistoryListItem(history.testGame, 'Some other platform')
      ];
      const groupings: HistoryGrouping[] = [grouping];

      const result = filterPlatforms(groupings, history.testGame);

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
        history.getHistoryGrouping('Game 1', 0)
      ];
      const result = filterStartTimes(groupings, '', '');
      expect(result).toEqual([]);
    });

    it('Should return empty when game is null', () => {
      const groupings: HistoryGrouping[] = [
        history.getHistoryGrouping('Game 1', 0)
      ];
      const result = filterStartTimes(groupings, null, '');
      expect(result).toEqual([]);
    });

    it('Should return empty when game does not match', () => {
      const groupings: HistoryGrouping[] = [
        history.getHistoryGrouping('Game 1', 0)
      ];
      const result = filterStartTimes(groupings, 'Not Game 1', '');
      expect(result).toEqual([]);
    });

    it('Should return empty when game matches but platform does not', () => {
      const grouping = history.getHistoryGrouping(history.testGame, 2);
      grouping.historyItems = [
        history.getHistoryListItem(history.testGame, 'Some other platform', 6000, 8000)
      ];
      const groupings: HistoryGrouping[] = [grouping];

      const result = filterStartTimes(groupings, history.testGame, 'Some platform');

      expect(result).toEqual([]);
    });

    it('Should return unqiue start times when game and platform matches', () => {
      const grouping = history.getHistoryGrouping(history.testGame, 6.5);
      grouping.historyItems = [
        history.getHistoryListItem(history.testGame, 'Some other platform', 6000, 8000),
        history.getHistoryListItem(history.testGame, 'Some platform', 1000, 5000),
        history.getHistoryListItem(history.testGame, 'Some platform', 100, 800)
      ];
      const groupings: HistoryGrouping[] = [grouping];

      const result = filterStartTimes(groupings, history.testGame, 'Some platform');

      expect(result).toEqual([100, 1000]);
    });
  });

  describe('filterHistoryItemsAfter', () => {
    it('Should return empty if grouping is undefined', () => {
      const result = filterHistoryItemsAfter(undefined, {
        id: 'some id',
        game: history.testGame,
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
        key: history.testGame,
        historyItems: [],
        totalTime: 0
      }, {
        id: 'some id',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 6000,
        endTime: 9000,
        dateRange: [new Date(6000), new Date(9000)],
        locked: false
      });
      expect(result.length).toBe(0);
    });

    it('Should return empty if there is a grouping but no match', () => {
      const result = filterHistoryItemsAfter(history.testGroupings[0], {
        id: 'some id',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 9000,
        endTime: 10000,
        dateRange: [new Date(9000), new Date(10000)],
        locked: false
      });
      expect(result.length).toBe(0);
    });

    it('Should return correctly filtered items when there is a match', () => {
      const result = filterHistoryItemsAfter(history.testGroupings[0], {
        id: 'some id',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)],
        locked: false
      });
      expect(result).toEqual([{
        id: '4',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 8000,
        endTime: 9000,
        dateRange: [new Date(8000), new Date(9000)],
        locked: false
      }, {
        id: '3',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(5000), new Date(6000)],
        locked: false
      }, {
        id: '2',
        game: history.testGame,
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
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 6000,
        endTime: 9000,
        dateRange: [new Date(6000), new Date(9000)],
        locked: false
      }, {
        id: 'some id 2',
        game: history.testGame,
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
        key: history.testGame,
        historyItems: [],
        totalTime: 0
      }, {
        id: 'some id',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 6000,
        endTime: 9000,
        dateRange: [new Date(6000), new Date(9000)],
        locked: false
      }, {
        id: 'some id 2',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 10000,
        endTime: 12000,
        dateRange: [new Date(10000), new Date(12000)],
        locked: false
      });
      expect(result.length).toBe(0);
    });

    it('Should return empty if there is a grouping but no match for start', () => {
      const result = filterHistoryItemsBetween(history.testGroupings[0], {
        id: 'some id',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 9000,
        endTime: 10000,
        dateRange: [new Date(9000), new Date(10000)],
        locked: false
      }, {
        id: 'some id 2',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 10000,
        endTime: 12000,
        dateRange: [new Date(10000), new Date(12000)],
        locked: false
      });
      expect(result.length).toBe(0);
    });

    it('Should return correctly filtered items when there is a match start', () => {
      const result = filterHistoryItemsBetween(history.testGroupings[0], {
        id: 'some id',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)],
        locked: false
      }, {
        id: 'some id 2',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 4000,
        endTime: 6000,
        dateRange: [new Date(4000), new Date(6000)],
        locked: false
      });
      expect(result).toEqual([{
        id: '3',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(5000), new Date(6000)],
        locked: false
      }, {
        id: '2',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)],
        locked: false
      }]);
    });
  });
});
