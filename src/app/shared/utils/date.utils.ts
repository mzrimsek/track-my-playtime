import { format, isSameDay } from 'date-fns';

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
  return format(date, 'ddd, M/D/YYYY');
};

export const isInDateRange = (dateToCheck: Date, dateRange: Date[]): boolean => {
  return dateRange.some(date => isSameDay(date, dateToCheck));
};

export const formatElapsedTime = (startTimeMS: number, endTimeMS: number, inactiveValue = '00:00:00'): string => {
  const elapsedTime = getElapsedTimeInSeconds(startTimeMS, endTimeMS);
  return elapsedTime >= 0 && canCalculateElapsedTime(startTimeMS, endTimeMS) ? formatTime(elapsedTime) : inactiveValue;
};

const canCalculateElapsedTime = (startTime: number, endTime: number): boolean => {
  const areValid = startTime !== 0 && endTime !== 0;
  const areInOrder = startTime <= endTime;
  return areValid && areInOrder;
};
