import { HistoryGrouping, HistoryListItem } from '../models';

import { getUniqueFrom } from './history-filter.utils';

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
    it('Should return empty when game is empty string', () => {
      fail();
    });

    it('Should return empty when game is null', () => {
      fail();
    });

    it('Should return empty when game does not match', () => {
      fail();
    });

    it('Should return unqiue platforms when game matches', () => {
      fail();
    });
  });

  describe('filterStartTimes', () => {
    it('Should return empty when game is empty string', () => {
      fail();
    });

    it('Should return empty when game is null', () => {
      fail();
    });

    it('Should return empty when game does not match', () => {
      fail();
    });

    it('Should return empty when game matches but platform does not', () => {
      fail();
    });

    it('Should return unqiue start times when game and platform matches', () => {
      fail();
    });
  });
});

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
