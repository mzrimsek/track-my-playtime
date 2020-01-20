import { addDays } from 'date-fns';
import { of } from 'rxjs';

import { DEFAULT_KEY, HistoryGrouping } from 'shared/models';

import { mapGroupings } from './library-data.utils';

describe('Library Data Utils', () => {
  describe('mapGroupings', () => {
    it('Should return correct data', () => {
      const data = of(testGroupings);
      const result = mapGroupings(data);
      result.subscribe(res => {
        expect(res).toEqual([{
          game: 'game 1',
          totalTime: 2,
          firstPlayed: start.getTime(),
          lastPlayed: addDays(start, 1).getTime() + 2000
        }, {
          game: 'game 2',
          totalTime: 4,
          firstPlayed: addDays(start, 3).getTime(),
          lastPlayed: addDays(start, 4).getTime() + 3000
        }]);
      });
    });

    it('Should set the key to the default value when the key is empty', () => {
      const grouping: HistoryGrouping = {
        ...testGroupings[0],
        key: ''
      };
      const groupings$ = of([grouping]);

      const result = mapGroupings(groupings$);

      result.subscribe(res => {
        expect(res[0].game).toBe(DEFAULT_KEY);
      });
    });
  });
});

const start = new Date();
const testGroupings: HistoryGrouping[] = [{
  key: 'game 1',
  historyItems: [{
    id: '3',
    game: 'game 1',
    platform: 'platform 2',
    startTime: addDays(start, 1).getTime(),
    endTime: addDays(start, 1).getTime() + 2000,
    dateRange: [addDays(start, 1), addDays(start, 1)],
    locked: false
  }, {
    id: '1',
    game: 'game 1',
    platform: 'platform 1',
    startTime: start.getTime(),
    endTime: start.getTime() + 1000,
    dateRange: [start, start],
    locked: false
  }],
  totalTime: 2
}, {
  key: 'game 2',
  historyItems: [{
    id: '2',
    game: 'game 2',
    platform: 'platform 1',
    startTime: addDays(start, 4).getTime(),
    endTime: addDays(start, 4).getTime() + 3000,
    dateRange: [addDays(start, 4), addDays(start, 4)],
    locked: false
  }, {
    id: '4',
    game: 'game 2',
    platform: 'platform 2',
    startTime: addDays(start, 3).getTime(),
    endTime: addDays(start, 3).getTime() + 1000,
    dateRange: [addDays(start, 3), addDays(start, 3)],
    locked: false
  }],
  totalTime: 4
}];
