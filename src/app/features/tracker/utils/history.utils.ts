import { HistoryListItem } from '../models';

export const getDateFromHistoryListItem = (item: HistoryListItem): string => {
  const date = new Date(item.startTime);
  return (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
};
