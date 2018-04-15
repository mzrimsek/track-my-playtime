import { addDays, eachDay, format, isSameDay, startOfWeek } from 'date-fns';

export const formatTime = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  const seconds = timeInSeconds - (hours * 3600) - (minutes * 60);

  return getZeroPaddingTime(hours) + ':' + getZeroPaddingTime(minutes) + ':' + getZeroPaddingTime(seconds);
};

export const getElapsedTimeInSeconds = (startTime: number, endTime: number) => Math.floor((endTime - startTime) / 1000);

const getZeroPaddingTime = (time: number): string => {
  const paddedTime = time < 10 ? '0' + time : '' + time;
  return paddedTime.indexOf('.') === -1 ? paddedTime : paddedTime.substr(0, paddedTime.indexOf('.'));
};

export const formatDate = (date: Date): string => {
  return format(date, 'M/D/YYYY');
};

export const getWeek = (date: Date): Date[] => {
  const start = startOfWeek(date);
  const end = addDays(start, 6);
  return eachDay(start, end);
};

export const isInDateRange = (dateToCheck: Date, dateRange: Date[]): boolean => {
  return dateRange.some(date => isSameDay(date, dateToCheck));
};
