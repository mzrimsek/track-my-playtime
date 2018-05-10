import { addDays, eachDay, subDays } from 'date-fns';
import { Observable } from 'rxjs/Observable';

import { HistoryGrouping } from '../../tracker/models';

import { formatDate } from '../../../shared/utils/date.utils';
import { getGraphData, getPaddedGraphData } from './graph-data.utils';

describe('Graph Data Utils', () => {
  describe('getPaddedGraphData', () => {
    describe('No data in range', () => {
      it('Should return length of data equal to date range', () => {
        const result = getPaddedGraphData(Observable.of([]), Observable.of(dateRange));
        result.subscribe(res => {
          expect(res.length).toBe(dateRange.length);
        });
      });

      it('Should return data points with 0 in value', () => {
        const result = getPaddedGraphData(Observable.of([]), Observable.of(dateRange));
        result.subscribe(res => {
          const allZero = res.every(x => x.value === 0);
          expect(allZero).toBe(true);
        });
      });
    });

    describe('When data in range', () => {
      it('Should return the correct data', () => {
        const result = getPaddedGraphData(Observable.of(testGroupings), Observable.of(dateRange));
        result.subscribe(res => {
          expect(res).toEqual([{
            name: formatDate(start),
            value: 1
          }, {
            name: formatDate(addDays(start, 1)),
            value: 0
          }, {
            name: formatDate(addDays(start, 2)),
            value: 0
          }, {
            name: formatDate(addDays(start, 3)),
            value: 0
          }, {
            name: formatDate(addDays(start, 4)),
            value: 4
          }, {
            name: formatDate(addDays(start, 5)),
            value: 0
          }, {
            name: formatDate(addDays(start, 6)),
            value: 0
          }, {
            name: formatDate(addDays(start, 7)),
            value: 0
          }, {
            name: formatDate(addDays(start, 8)),
            value: 0
          }, {
            name: formatDate(addDays(start, 9)),
            value: 0
          }, {
            name: formatDate(addDays(start, 10)),
            value: 0
          }, {
            name: formatDate(addDays(start, 11)),
            value: 0
          }, {
            name: formatDate(addDays(start, 12)),
            value: 0
          }]);
        });
      });
    });
  });

  describe('getGraphData', () => {
    it('Should return nothing when no data in range', () => {
      const result = getGraphData(Observable.of([]), Observable.of(dateRange));
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return correct data when in range', () => {
      const result = getGraphData(Observable.of(testGroupings), Observable.of(dateRange));
      result.subscribe(res => {
        expect(res).toEqual([{
          name: formatDate(start),
          value: 1
        }, {
          name: formatDate(addDays(start, 4)),
          value: 4
        }]);
      });
    });
  });
});

const start = new Date();
const end = addDays(start, 12);
const dateRange = eachDay(start, end);

const testGroupings: HistoryGrouping[] = [{
  key: formatDate(subDays(start, 1)),
  historyItems: [{
    id: '3',
    game: 'game 1',
    platform: 'platform 2',
    startTime: subDays(start, 1).getTime(),
    endTime: subDays(start, 1).getTime() + 2000,
    dateRange: [subDays(start, 1), subDays(start, 1)]
  }],
  totalTime: 2
}, {
  key: formatDate(start),
  historyItems: [{
    id: '1',
    game: 'game 1',
    platform: 'platform 1',
    startTime: start.getTime(),
    endTime: start.getTime() + 1000,
    dateRange: [start, start]
  }],
  totalTime: 1
}, {
  key: formatDate(addDays(start, 4)),
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
    startTime: addDays(start, 4).getTime(),
    endTime: addDays(start, 4).getTime() + 1000,
    dateRange: [addDays(start, 4), addDays(start, 4)]
  }],
  totalTime: 4
}];
