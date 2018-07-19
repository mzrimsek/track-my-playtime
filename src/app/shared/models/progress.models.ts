export interface ProgressItem {
  id: string;
  startEntryId: string;
  endEntryId: string;
}

export interface CompletedItem {
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
  timePlayed: number;
}

export interface MarkCompletePayload {
  itemId: string;
  endEntryId: string;
}
