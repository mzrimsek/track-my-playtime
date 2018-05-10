import { Observable } from 'rxjs/Observable';

import { HistoryGrouping } from '../../../shared/models';

export const takeFrom =
  (groupings: Observable<HistoryGrouping[]>, amount: Observable<number>): Observable<HistoryGrouping[]> => {
    return groupings.combineLatest(amount, (groups, num) => {
      return num >= groups.length ? groups : groups.slice(0, num);
    });
  };

export const hasMoreToDisplay = (all: Observable<HistoryGrouping[]>, filtered: Observable<HistoryGrouping[]>): Observable<boolean> => {
  return all.combineLatest(filtered, (allGroups, partialGroups) => {
    return JSON.stringify(allGroups) !== JSON.stringify(partialGroups);
  });
};
