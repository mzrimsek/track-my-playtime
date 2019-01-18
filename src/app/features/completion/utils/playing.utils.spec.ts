import { Dictionary, HistoryListItem, ProgressItem } from '../../../shared/models';
import { MarkCompleteItem } from '../models';

import { getEndItem, getPlayingDisplayData } from './playing.utils';

import { history } from '../../../test-helpers';

describe('Playing Utils', () => {
  describe('getPlayingDisplayData', () => {
    it('Should return correct data', () => {
      const progressItem: ProgressItem = {
        id: 'some id',
        startEntryId: '1',
        endEntryId: '',
        notes: ''
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
      const entities: Dictionary<MarkCompleteItem> = {
        'some id': {
          id: 'some id',
          showExtra: false,
          endTime: 0
        }
      };

      const result = getPlayingDisplayData(progressItem, history.testGroupings, startEntry, entities);

      expect(result).toEqual({
        item: progressItem,
        startEntryData: startEntry,
        timePlayed: 3,
        endDates: [9000, 6000, 4000],
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
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 2000,
        endTime: 2500,
        dateRange: [new Date(2000), new Date(2500)],
        locked: false
      };
      const result = getEndItem([], startEntry, 0);
      expect(result).toBeUndefined();
    });

    it('Should return undefined when there is no match', () => {
      const startEntry: HistoryListItem = {
        id: 'some id',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 2000,
        endTime: 2500,
        dateRange: [new Date(2000), new Date(2500)],
        locked: false
      };
      const result = getEndItem(history.testGroupings, startEntry, 0);
      expect(result).toBeUndefined();
    });

    it('Should return correct history item when there is a match', () => {
      const startEntry: HistoryListItem = {
        id: 'some id',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 2000,
        endTime: 2500,
        dateRange: [new Date(2000), new Date(2500)],
        locked: false
      };
      const result = getEndItem(history.testGroupings, startEntry, 6000);
      expect(result).toEqual({
        id: '3',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(5000), new Date(6000)],
        locked: false
      });
    });
  });
});
