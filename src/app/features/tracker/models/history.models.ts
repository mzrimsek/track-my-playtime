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
