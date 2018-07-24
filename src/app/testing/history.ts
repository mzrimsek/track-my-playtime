import { HistoryGrouping, HistoryListItem } from '../shared/models';

export namespace history {
  export const getHistoryListItem = (game: string, platform = 'some platform', startTime = 0, endTime = 0): HistoryListItem => {
    return <HistoryListItem>{
      id: 'totally a unique id',
      game,
      platform,
      startTime,
      endTime,
      dateRange: [new Date(startTime), new Date(endTime)],
      locked: false
    };
  };

  export const getHistoryGrouping = (key: string, totalTime: number): HistoryGrouping => {
    return {
      key,
      totalTime,
      historyItems: []
    };
  };
}
