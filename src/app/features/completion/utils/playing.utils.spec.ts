import { HistoryGrouping, HistoryListItem } from '../../../shared/models';
import { ProgressItem } from '../models';

import {
    filterHistoryItemsFrom, getHistoryListItemMap, getPlayingDisplayData, getPlayingItem,
    HistoryListItemMap
} from './playing.utils';

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

  describe('filterHistoryItemsFrom', () => {
    it('Should return empty if there are no groupings', () => {
      const result = filterHistoryItemsFrom({
        key: testGame,
        historyItems: [],
        totalTime: 0
      }, {
          id: '1',
          game: testGame,
          platform: 'Platform 1',
          startTime: 6000,
          endTime: 9000,
          dateRange: [new Date(6000), new Date(9000)]
        });
      expect(result.length).toBe(0);
    });

    it('Should return empty if there are groupings but no match', () => {
      const result = filterHistoryItemsFrom(testGroupings[0], {
        id: '1',
        game: testGame,
        platform: 'Platform 1',
        startTime: 6000,
        endTime: 9000,
        dateRange: [new Date(6000), new Date(9000)]
      });
      expect(result.length).toBe(0);
    });

    it('Should return correctly filtered items when there is a match', () => {
      const result = filterHistoryItemsFrom(testGroupings[0], {
        id: '1',
        game: testGame,
        platform: 'Platform 1',
        startTime: 2000,
        endTime: 2500,
        dateRange: [new Date(2000), new Date(2500)]
      });
      expect(result).toEqual([{
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
      }]);
    });
  });

  describe('getPlayingItem', () => {
    it('Should return correct data', () => {
      const result = getPlayingItem(testGroupings[0].historyItems, {
        id: '1',
        game: testGame,
        platform: 'Platform 1',
        startTime: 2000,
        endTime: 2500,
        dateRange: [new Date(2000), new Date(2500)]
      });
      expect(result).toEqual({
        game: testGame,
        platform: 'Platform 1',
        startTime: 2000,
        timePlayed: 3
      });
    });
  });

  describe('getPlayingDisplayData', () => {
    it('Should return correct data', () => {
      const progressItem: ProgressItem = {
        id: 'some id',
        startEntryId: '1',
        endEntryId: ''
      };
      const startEntry: HistoryListItem = {
        id: '1',
        game: testGame,
        platform: 'Platform 1',
        startTime: 2000,
        endTime: 2500,
        dateRange: [new Date(2000), new Date(2500)]
      };

      const result = getPlayingDisplayData(progressItem, testGroupings, startEntry);

      expect(result).toEqual({
        item: progressItem,
        startEntryData: startEntry,
        playingItem: {
          game: testGame,
          platform: 'Platform 1',
          startTime: 2000,
          timePlayed: 2
        },
        endDates: [6000, 4000]
      });
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

