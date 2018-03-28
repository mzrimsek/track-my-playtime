export interface HistoryListItem {
  id: string;
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
}

export interface HistoryGrouping {
  date: string;
  historyItems: HistoryListItem[];
}
