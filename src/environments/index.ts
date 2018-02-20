export interface Environment {
  production: boolean;
  urls: {
    loadPlatforms: string;
    saveTimerInfo: string;
    loadHistoryItems: string;
  };
}
