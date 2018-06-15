import { HistoryGrouping, HistoryListItem } from '../models';

import {
    filterEndTimes, filterPlatforms, filterStartTimes, getUniqueFrom
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

  describe('filterEndTimes', () => {
    it('Should return empty when no groupings', () => {
      const result = filterEndTimes([], getHistoryListItem('', ''));
      expect(result).toEqual([]);
    });

    it('Should return empty when game is empty string', () => {
      const groupings: HistoryGrouping[] = [
        getHistoryGrouping('Game 1', 0)
      ];
      const result = filterEndTimes(groupings, getHistoryListItem('', ''));
      expect(result).toEqual([]);
    });

    it('Should return empty when game does not match', () => {
      const groupings: HistoryGrouping[] = [
        getHistoryGrouping('Game 1', 0)
      ];
      const result = filterEndTimes(groupings, getHistoryListItem('Not Game 1', ''));
      expect(result).toEqual([]);
    });

    it('Should return empty when game matches but platform does not', () => {
      const grouping = getHistoryGrouping(testGame, 2);
      grouping.historyItems = [
        getHistoryListItem(testGame, 'Some other platform', 6000, 8000)
      ];
      const groupings: HistoryGrouping[] = [grouping];

      const result = filterEndTimes(groupings, getHistoryListItem(testGame, 'Some platform'));

      expect(result).toEqual([]);
    });

    it('Should return empty when game matches and platform matches but no start time in range', () => {
      const grouping = getHistoryGrouping(testGame, 2);
      grouping.historyItems = [
        getHistoryListItem(testGame, 'Some other platform', 6000, 8000),
        getHistoryListItem(testGame, 'Some platform', 1000, 5000)
      ];
      const groupings: HistoryGrouping[] = [grouping];

      const result = filterEndTimes(groupings, getHistoryListItem(testGame, 'Some other platform', 9000, 10000));

      expect(result).toEqual([]);
    });

    it('Should return unique start times when game and platform matches and start time in range', () => {
      const grouping = getHistoryGrouping(testGame, 6.5);
      grouping.historyItems = [
        getHistoryListItem(testGame, 'Some other platform', 6000, 8000),
        getHistoryListItem(testGame, 'Some platform', 1000, 5000),
        getHistoryListItem(testGame, 'Some platform', 100, 800)
      ];
      const groupings: HistoryGrouping[] = [grouping];

      const result = filterEndTimes(groupings, getHistoryListItem(testGame, 'Some platform', 100, 800));

      expect(result).toEqual([5000]);
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
    dateRange: [new Date(startTime), new Date(endTime)]
  };
};

const getHistoryGrouping = (key: string, totalTime: number): HistoryGrouping => {
  return {
    key,
    totalTime,
    historyItems: []
  };
};
