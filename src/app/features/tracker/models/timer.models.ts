export interface TimerInfo {
  game: string;
  platform: string;
  active: boolean;
  startTime: number;
}

export interface AddTimerInfo {
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
}
