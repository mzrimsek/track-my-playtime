import { HistoryListItem, ProgressItem } from '../../../shared/models';

import { getCompletedDisplayData } from './completed.utils';

import { history } from '../../../test-helpers';

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
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 2000,
        endTime: 2500,
        dateRange: [new Date(2000), new Date(2500)],
        locked: false
      };
      const endEntry: HistoryListItem = {
        id: '2',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(4000), new Date(8000)],
        locked: false
      };

      const result = getCompletedDisplayData(progressItem, history.testGroupings, startEntry, endEntry);

      expect(result).toEqual({
        item: progressItem,
        completedItem: {
          game: history.testGame,
          platform: 'Platform 1',
          startTime: 2000,
          endTime: 6000,
          timePlayed: 2
        },
      });
    });
  });
});
