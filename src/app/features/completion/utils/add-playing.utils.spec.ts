import { history } from 'app/test-helpers';

import { AddPlayingInfo } from 'features/completion/models';

import { findMatchingHistoryEntry } from './add-playing.utils';

describe('Add Playing Utils', () => {
  describe('findMatchingHistoryEntry', () => {
    it('Should return undefined when no match is found', () => {
      const info: AddPlayingInfo = {
        game: '',
        platform: '',
        startTime: 0
      };
      const result = findMatchingHistoryEntry(history.testGroupings, info);
      expect(result).toBeUndefined();
    });

    it('Should return correct item when match is found', () => {
      const info: AddPlayingInfo = {
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 3000
      };
      const result = findMatchingHistoryEntry(history.testGroupings, info);
      expect(result).toEqual({
        id: '2',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)],
        locked: false
      });
    });
  });
});
