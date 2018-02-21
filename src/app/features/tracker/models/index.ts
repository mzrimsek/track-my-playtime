export interface TimerInfo {
  game: string;
  platform: string;
  active: boolean;
  startDate: string;
  platforms: string[];
}

export interface HistoryListItem {
  id: string;
  game: string;
  platform: string;
  startDate: Date;
  endDate: Date;
}

export interface AddTimerInfo {
  game: string;
  platform: string;
  startDate: Date;
  endDate: Date;
}
