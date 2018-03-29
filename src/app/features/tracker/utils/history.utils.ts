import { HistoryListItem } from '../models';

export const getDateFromHistoryListItem = (item: HistoryListItem): string => {
  const date = item.dateRange[0];
  return (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
};
