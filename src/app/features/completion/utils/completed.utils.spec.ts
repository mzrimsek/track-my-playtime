import { HistoryGrouping, HistoryListItem } from '../../../shared/models';
import { ProgressItem } from '../models';

import { getCompletedDisplayData } from './completed.utils';

describe('Completed Utils', () => {
  describe('getCompletedDisplayData', () => {
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
      const endEntry: HistoryListItem = {
        id: '2',
        game: testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(4000), new Date(8000)]
      };

      const result = getCompletedDisplayData(progressItem, testGroupings, startEntry, endEntry);

      expect(result).toEqual({
        item: progressItem,
        completedItem: {
          game: testGame,
          platform: 'Platform 1',
          startTime: 2000,
          endTime: 6000,
          timePlayed: 2
        },
      });
    });
  });
});

const testGame = 'Game 1';

const testGroupings: HistoryGrouping[] = [{
  key: testGame,
  historyItems: [{
    id: '4',
    game: testGame,
    platform: 'Platform 1',
    startTime: 8000,
    endTime: 9000,
    dateRange: [new Date(8000), new Date(9000)]
  }, {
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
