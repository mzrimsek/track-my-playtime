import { Observable, of } from 'rxjs';

import { MarkCompleteItem } from 'features/completion/models';
import { Dictionary, HistoryGrouping, ProgressItem } from 'shared/models';

import { getCompletedDisplayDataItems, getPlayingDisplayDataItems } from './display-data.utils';

describe('Display Data Utils', () => {
  describe('getCompletedDisplayDataItems', () => {
    it('Should return empty when no items', () => {
      const result = getCompletedDisplayDataItems(of([]), of([]));
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return empty when no item start entry match', () => {
      const progressItems: Observable<ProgressItem[]> = of([{
        id: '1',
        startEntryId: 'some start id',
        endEntryId: 'some end id',
        notes: ''
      }]);
      const grouping: HistoryGrouping = {
        key: 'some game',
        historyItems: [{
          id: 'not some start id',
          game: 'some game',
          platform: 'some platform',
          startTime: 1000,
          endTime: 4000,
          dateRange: [new Date(1000), new Date(4000)],
          locked: false
        }],
        totalTime: 3
      };
      const gameGroupings: Observable<HistoryGrouping[]> = of([grouping]);

      const result = getCompletedDisplayDataItems(progressItems, gameGroupings);

      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return correct data when item start entry matches', () => {
      const progressItems: Observable<ProgressItem[]> = of([{
        id: '1',
        startEntryId: 'some start id',
        endEntryId: 'some end id',
        notes: ''
      }]);
      const grouping: HistoryGrouping = {
        key: 'some game',
        historyItems: [{
          id: 'some end id',
          game: 'some game',
          platform: 'some platform',
          startTime: 5000,
          endTime: 6000,
          dateRange: [new Date(5000), new Date(6000)],
          locked: false
        }, {
          id: 'some start id',
          game: 'some game',
          platform: 'some platform',
          startTime: 1000,
          endTime: 4000,
          dateRange: [new Date(1000), new Date(4000)],
          locked: false
        }],
        totalTime: 4
      };
      const gameGroupings: Observable<HistoryGrouping[]> = of([grouping]);

      const result = getCompletedDisplayDataItems(progressItems, gameGroupings);

      result.subscribe(res => {
        expect(res).toEqual([{
          item: {
            id: '1',
            startEntryId: 'some start id',
            endEntryId: 'some end id',
            notes: ''
          },
          completedItem: {
            game: 'some game',
            platform: 'some platform',
            startTime: 1000,
            endTime: 6000,
            timePlayed: 4
          }
        }]);
      });
    });
  });

  describe('getPlayingDisplayDataItems', () => {
    it('Should return empty when no items', () => {
      const result = getPlayingDisplayDataItems(of([]), of([]), of({}));
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return empty when no item start entry match', () => {
      const progressItems: Observable<ProgressItem[]> = of([{
        id: '1',
        startEntryId: 'some start id',
        endEntryId: '',
        notes: ''
      }]);
      const grouping: HistoryGrouping = {
        key: 'some game',
        historyItems: [{
          id: 'not some start id',
          game: 'some game',
          platform: 'some platform',
          startTime: 1000,
          endTime: 4000,
          dateRange: [new Date(1000), new Date(4000)],
          locked: false
        }],
        totalTime: 3
      };
      const gameGroupings: Observable<HistoryGrouping[]> = of([grouping]);

      const result = getPlayingDisplayDataItems(progressItems, gameGroupings, of({}));
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return correct data when item start entry matches', () => {
      const progressItems: Observable<ProgressItem[]> = of([{
        id: '1',
        startEntryId: 'some start id',
        endEntryId: '',
        notes: ''
      }]);
      const grouping: HistoryGrouping = {
        key: 'some game',
        historyItems: [{
          id: 'some start id',
          game: 'some game',
          platform: 'some platform',
          startTime: 1000,
          endTime: 4000,
          dateRange: [new Date(1000), new Date(4000)],
          locked: false
        }],
        totalTime: 3
      };
      const gameGroupings: Observable<HistoryGrouping[]> = of([grouping]);
      const markCompleteEntities: Observable<Dictionary<MarkCompleteItem>> = of({
        '1': {
          id: '1',
          showExtra: false,
          endTime: 0
        }
      });

      const result = getPlayingDisplayDataItems(progressItems, gameGroupings, markCompleteEntities);
      result.subscribe(res => {
        expect(res).toEqual([{
          item: {
            id: '1',
            startEntryId: 'some start id',
            endEntryId: '',
            notes: ''
          },
          startEntryData: {
            id: 'some start id',
            game: 'some game',
            platform: 'some platform',
            startTime: 1000,
            endTime: 4000,
            dateRange: [new Date(1000), new Date(4000)],
            locked: false
          },
          timePlayed: 3,
          endDates: [4000],
          markComplete: {
            id: '1',
            showExtra: false,
            endTime: 0
          }
        }]);
      });
    });
  });
});
