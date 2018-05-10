import { Observable } from 'rxjs/Observable';

import { HistoryGrouping, HistoryListItem } from '../../../shared/models';

import { hasMoreToDisplay, takeFrom } from './display.utils';

describe('Display Utils', () => {
  let grouping1: HistoryGrouping;
  let grouping2: HistoryGrouping;

  beforeEach(() => {
    grouping1 = getHistoryGrouping('5/3/2018', 5);
    grouping1.historyItems = [
      getHistoryListItem('game 1', 3000, 6000),
      getHistoryListItem('game 2', 0, 2000)
    ];
    grouping2 = getHistoryGrouping('5/2/2018', 1);
    grouping2.historyItems = [
      getHistoryListItem('game 1', 0, 1000)
    ];
  });

  describe('takeFrom', () => {
    it('Should return part of the data when amount less than data length', () => {
      const result = takeFrom(Observable.of([grouping1, grouping2]), Observable.of(1));
      result.subscribe(res => {
        expect(res).toEqual([grouping1]);
      });
    });

    it('Should return all data when amount is data length', () => {
      const result = takeFrom(Observable.of([grouping1, grouping2]), Observable.of(2));
      result.subscribe(res => {
        expect(res).toEqual([grouping1, grouping2]);
      });
    });

    it('Should return all data when amount is greater than data length', () => {
      const result = takeFrom(Observable.of([grouping1, grouping2]), Observable.of(3));
      result.subscribe(res => {
        expect(res).toEqual([grouping1, grouping2]);
      });
    });
  });

  describe('hasMoreToDisplay', () => {
    it('Should return false when lists are the same', () => {
      const result = hasMoreToDisplay(Observable.of([grouping1, grouping2]), Observable.of([grouping1, grouping2]));
      result.subscribe(res => {
        expect(res).toBe(false);
      });
    });

    it('Should return true when the list are different', () => {
      const result = hasMoreToDisplay(Observable.of([grouping1, grouping2]), Observable.of([grouping1]));
      result.subscribe(res => {
        expect(res).toBe(true);
      });
    });
  });
});

const getHistoryListItem = (game: string, startTime = 0, endTime = 0): HistoryListItem => {
  return <HistoryListItem>{
    id: 'totally a unique id',
    game,
    platform: 'the best platform ever',
    startTime,
    endTime,
    dateRange: [new Date(startTime), new Date(endTime)]
  };
};

const getHistoryGrouping = (key: string, totalTime: number): HistoryGrouping => {
  return {
    key,
    totalTime,
    historyItems: []
  };
};
