import { HistoryListItem } from '../../../shared/models';

export interface ProgressItem {
  id: string;
  startEntryId: string;
  endEntryId: string;
}

export interface Playing {
  game: string;
  platform: string;
  startTime: number;
  timePlayed: number;
}

export interface DisplayPlaying {
  item: ProgressItem;
  startEntryData: HistoryListItem;
}

export interface Completed {
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
