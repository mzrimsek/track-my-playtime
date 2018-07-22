import { CompletedItem, HistoryListItem, ProgressItem } from '../../../shared/models';

import { MarkCompleteItem } from './';

export interface PlayingDisplayData {
  item: ProgressItem;
  startEntryData: HistoryListItem;
  timePlayed: number;
  endDates: number[];
  markComplete: MarkCompleteItem;
}

export interface CompletedDisplayData {
  item: ProgressItem;
  completedItem: CompletedItem;
}
