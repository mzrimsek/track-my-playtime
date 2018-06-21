import { HistoryListItem } from '../../../shared/models';

import { MarkCompleteItem } from './mark-complete.model';

export interface ProgressItem {
  id: string;
  startEntryId: string;
  endEntryId: string;
}

export interface PlayingItem {
  game: string;
  platform: string;
  startTime: number;
  timePlayed: number;
}

export interface PlayingDisplayData {
  item: ProgressItem;
  startEntryData: HistoryListItem;
  playingItem: PlayingItem;
  endDates: number[];
  markComplete: MarkCompleteItem;
}

export interface CompletedItem {
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
  timePlayed: number;
}

export interface CompletedDisplayData {
  item: ProgressItem;
  completedItem: CompletedItem;
}

export interface MarkCompletePayload {
  itemId: string;
  endEntryId: string;
}
