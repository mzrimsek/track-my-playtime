import { Dictionary, HistoryGrouping, HistoryListItem } from '../../../shared/models';
import { MarkCompleteItem, ProgressItem } from '../models';

import { getEndItem, getPlayingDisplayData } from './playing.utils';

describe('Playing Utils', () => {
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
      const entities: Dictionary<MarkCompleteItem> = {
        'some id': {
          id: 'some id',
          showExtra: false,
          endTime: 0
        }
      };

      const result = getPlayingDisplayData(progressItem, testGroupings, startEntry, entities);

      expect(result).toEqual({
        item: progressItem,
        startEntryData: startEntry,
        timePlayed: 2,
        endDates: [6000, 4000],
        markComplete: {
          id: 'some id',
          showExtra: false,
          endTime: 0
        }
      });
    });
  });

  describe('getEndItem', () => {
    it('Should return undefined when there are no groupings', () => {
      const startEntry: HistoryListItem = {
        id: 'some id',
        game: testGame,
        platform: 'Platform 1',
        startTime: 2000,
        endTime: 2500,
        dateRange: [new Date(2000), new Date(2500)]
      };
      const result = getEndItem([], startEntry, 0);
      expect(result).toBeUndefined();
    });

    it('Should return undefined when there is no match', () => {
      const startEntry: HistoryListItem = {
        id: 'some id',
        game: testGame,
        platform: 'Platform 1',
        startTime: 2000,
        endTime: 2500,
        dateRange: [new Date(2000), new Date(2500)]
      };
      const result = getEndItem(testGroupings, startEntry, 0);
      expect(result).toBeUndefined();
    });

    it('Should return correct history item when there is a match', () => {
      const startEntry: HistoryListItem = {
        id: 'some id',
        game: testGame,
        platform: 'Platform 1',
        startTime: 2000,
        endTime: 2500,
        dateRange: [new Date(2000), new Date(2500)]
      };
      const result = getEndItem(testGroupings, startEntry, 6000);
      expect(result).toEqual({
        id: '3',
        game: testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(5000), new Date(6000)]
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
