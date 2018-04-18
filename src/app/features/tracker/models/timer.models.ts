export interface TimerInfo {
  game: string;
  platform: string;
  startTime: number;
}

export interface AddTimerInfo {
  userId: string;
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
}
