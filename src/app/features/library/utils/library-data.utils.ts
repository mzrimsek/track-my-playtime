import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEFAULT_KEY, HistoryGrouping } from '../../../shared/models';
import { LibraryEntry } from '../models';

export const mapGroupings = (groupings: Observable<HistoryGrouping[]>): Observable<LibraryEntry[]> => {
  return groupings.pipe(map(groups => groups.map(group => {
    const firstPlayed = group.historyItems[group.historyItems.length - 1].startTime;
    const lastPlayed = group.historyItems[0].endTime;
    return <LibraryEntry>{
      game: group.key === '' ? DEFAULT_KEY : group.key,
      totalTime: group.totalTime,
      firstPlayed,
      lastPlayed
    };
  })));
};
