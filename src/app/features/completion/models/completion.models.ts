export interface Game {
  id: string;
  title: string;
  platform: string;
  totalTime: number;
  startTime: number;
  endTime?: number;
}
