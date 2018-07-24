import { Observable } from 'rxjs/Observable';

import { HistoryGrouping } from '../../../shared/models';

import { hasMoreToDisplay, takeFrom } from './display.utils';

import { history } from '../../../test-helpers';

describe('Display Utils', () => {
  let grouping1: HistoryGrouping;
  let grouping2: HistoryGrouping;

  beforeEach(() => {
    grouping1 = history.getHistoryGrouping('5/3/2018', 5);
    grouping1.historyItems = [
      history.getHistoryListItem('game 1', 'the best platform ever', 3000, 6000),
      history.getHistoryListItem('game 2', 'the best platform ever', 0, 2000)
    ];
    grouping2 = history.getHistoryGrouping('5/2/2018', 1);
    grouping2.historyItems = [
      history.getHistoryListItem('game 1', 'the best platform ever', 0, 1000)
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
