export interface GameEntry {
  id: string;
  game: string;
  platform: string;
  totalTime: number;
  startTime: number;
  endTime?: number;
}

export interface AddPlayingGame {
  game: string;
  platform: string;
  startTime: number;
}
