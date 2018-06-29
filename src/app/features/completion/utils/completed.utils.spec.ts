import { HistoryGrouping, HistoryListItem, ProgressItem } from '../../../shared/models';

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
        dateRange: [new Date(2000), new Date(2500)],
        locked: false
      };
      const endEntry: HistoryListItem = {
        id: '2',
        game: testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(4000), new Date(8000)],
        locked: false
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
