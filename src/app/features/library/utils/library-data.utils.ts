import { Observable } from 'rxjs/Observable';

import { HistoryGrouping } from '../../../shared/models';
import { LibraryEntry } from '../models';

import { formatTime } from '../../../shared/utils/date.utils';

export const mapGroupings = (groupings: Observable<HistoryGrouping[]>): Observable<LibraryEntry[]> => {
  return groupings.map(groups => groups.map(group => {
    const firstPlayed = group.historyItems[group.historyItems.length - 1].startTime;
    const lastPlayed = group.historyItems[0].endTime;
    return <LibraryEntry>{
      game: group.key,
      totalTime: formatTime(group.totalTime),
      firstPlayed,
      lastPlayed
    };
  }));
};
