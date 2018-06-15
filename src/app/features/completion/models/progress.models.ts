import { HistoryListItem } from '../../../shared/models';

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
}

export interface CompletedItem {
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
  timePlayed: number;
}

export interface DisplayCompleted {
  item: ProgressItem;
  startEntryData: HistoryListItem;
  endEntryData: HistoryListItem;
}

export interface MarkCompletePayload {
  itemId: string;
  endEntryId: string;
}
