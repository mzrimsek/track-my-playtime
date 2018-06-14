export interface AddPlayingInfo {
  game: string;
  platform: string;
  startTime: number;
}

export interface AddPlaying {
  userId: string;
  startEntryId: string;
}
