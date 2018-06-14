import { HistoryGrouping, HistoryListItem } from '../../../shared/models';
import { AddPlayingInfo } from '../models';

export const findMatchingHistoryEntry = (groupings: HistoryGrouping[], info: AddPlayingInfo): HistoryListItem | undefined => {
  const selectedGameGrouping = groupings.find(grouping => grouping.key === info.game);
  return selectedGameGrouping ? selectedGameGrouping.historyItems.find(item =>
    item.game === info.game &&
    item.platform === info.platform &&
    item.startTime === info.startTime) : undefined;
};
