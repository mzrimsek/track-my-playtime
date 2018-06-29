import { HistoryGrouping } from '../../../shared/models';
import { AddPlayingInfo } from '../models';

import { findMatchingHistoryEntry } from './add-playing.utils';

describe('Add Playing Utils', () => {
  describe('findMatchingHistoryEntry', () => {
    it('Should return undefined when no match is found', () => {
      const info: AddPlayingInfo = {
        game: '',
        platform: '',
        startTime: 0
      };
      const result = findMatchingHistoryEntry(testGroupings, info);
      expect(result).toBeUndefined();
    });

    it('Should return correct item when match is found', () => {
      const info: AddPlayingInfo = {
        game: testGame,
        platform: 'Platform 1',
        startTime: 3000
      };
      const result = findMatchingHistoryEntry(testGroupings, info);
      expect(result).toEqual({
        id: '2',
        game: testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)],
        locked: false
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
