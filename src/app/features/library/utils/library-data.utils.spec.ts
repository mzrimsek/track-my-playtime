import { addDays } from 'date-fns';
import { Observable } from 'rxjs/Observable';

import { HistoryGrouping } from '../../../shared/models';

import { mapGroupings } from './library-data.utils';

describe('Library Data Utils', () => {
  describe('mapGroupings', () => {
    it('Should return correct data', () => {
      const data = Observable.of(testGroupings);
      const result = mapGroupings(data);
      result.subscribe(res => {
        expect(res).toEqual([{
          game: 'game 1',
          totalTime: '00:00:02',
          firstPlayed: start.getTime(),
          lastPlayed: addDays(start, 1).getTime() + 2000
        }, {
          game: 'game 2',
          totalTime: '00:00:04',
          firstPlayed: addDays(start, 3).getTime(),
          lastPlayed: addDays(start, 4).getTime() + 3000
        }]);
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
    dateRange: [addDays(start, 1), addDays(start, 1)]
  }, {
    id: '1',
    game: 'game 1',
    platform: 'platform 1',
    startTime: start.getTime(),
    endTime: start.getTime() + 1000,
    dateRange: [start, start]
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
    dateRange: [addDays(start, 4), addDays(start, 4)]
  }, {
    id: '4',
    game: 'game 2',
    platform: 'platform 2',
    startTime: addDays(start, 3).getTime(),
    endTime: addDays(start, 3).getTime() + 1000,
    dateRange: [addDays(start, 3), addDays(start, 3)]
  }],
  totalTime: 4
}];
