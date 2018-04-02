export interface HistoryListItem {
  id: string;
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
  dateRange: Date[];
}

export interface HistoryGrouping {
  date: string;
  totalTime: string;
  historyItems: HistoryListItem[];
}

export interface UpdateHistoryItemGamePayload {
  itemId: string;
  game: string;
}

export interface UpdateHistoryItemPlatformPayload {
  itemId: string;
  platform: string;
}

export interface UpdateHistoryItemTimesPayload {
  itemId: string;
  startTime: number;
  endTime: number;
}
