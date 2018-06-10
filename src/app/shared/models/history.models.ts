export interface HistoryListItem {
  id: string;
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
  dateRange: [Date, Date];
}

export interface HistoryGrouping {
  key: string;
  totalTime: number;
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

export type UpdatePayload = UpdateHistoryItemGamePayload | UpdateHistoryItemPlatformPayload | UpdateHistoryItemTimesPayload;
