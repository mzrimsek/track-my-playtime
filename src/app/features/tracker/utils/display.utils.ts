import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HistoryGrouping } from 'shared/models';

export const takeFrom =
  (groupings: Observable<HistoryGrouping[]>, amount: Observable<number>): Observable<HistoryGrouping[]> => {
    return combineLatest([groupings, amount]).pipe(map(([groups, num]) => {
      return num >= groups.length ? groups : groups.slice(0, num);
    }));
  };

export const hasMoreToDisplay = (all: Observable<HistoryGrouping[]>, filtered: Observable<HistoryGrouping[]>): Observable<boolean> => {
  return combineLatest([all, filtered]).pipe(map(([allGroups, partialGroups]) => {
    return JSON.stringify(allGroups) !== JSON.stringify(partialGroups);
  }));
};
