import { HistoryListItem } from '../models';

export const getDateFromHistoryListItem = (item: HistoryListItem): string => {
  const date = item.dateRange[0];
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
};
