import { addDays, eachDayOfInterval, subDays } from 'date-fns';

import {
    formatDate, formatElapsedTime, formatTime, getElapsedTimeInSeconds, isInDateRange
} from './date.utils';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

describe('Date Utils', () => {
  describe('formatTime', () => {
    it('Can format seconds', () => {
      const oneSecond = 1;
      const result = formatTime(oneSecond);
      expect(result).toBe('00:00:01');
    });

    it('Can format minutes', () => {
      const result = formatTime(MINUTE);
      expect(result).toBe('00:01:00');
    });

    it('Can format hours', () => {
      const result = formatTime(HOUR);
      expect(result).toBe('01:00:00');
    });

    it('Can format days', () => {
      const result = formatTime(DAY);
      expect(result).toBe('24:00:00');
    });

    it('Can format multi-day time', () => {
      const timeInSeconds = (DAY * 2) + (HOUR * 3) + (MINUTE * 34) + 96;
      const result = formatTime(timeInSeconds);
      expect(result).toBe('51:35:36');
    });

    it('Can format time over 100 hours', () => {
      const timeInSeconds = HOUR * 150;
      const result = formatTime(timeInSeconds);
      expect(result).toBe('150:00:00');
    });
  });

  describe('getElapsedTimeInSeconds', () => {
    // timestamps are in milliseconds
    it('Can calculate seconds between timestamps', () => {
      const start = new Date().getTime();
      const end = start + (MINUTE * 1000);
      const result = getElapsedTimeInSeconds(start, end);
      expect(result).toBe(MINUTE);
    });

    it('Can calculate seconds between timestamps days apart', () => {
      const start = new Date().getTime();
      const amountToAdd = (DAY * 2) + (HOUR * 4) + (MINUTE * 3) + 85;
      const end = start + (amountToAdd * 1000);
      const result = getElapsedTimeInSeconds(start, end);
      expect(result).toBe(amountToAdd);
    });
  });

  describe('formatDate', () => {
    it('Can format a date', () => {
      const date = new Date(2018, 3, 1);
      const result = formatDate(date);
      expect(result).toBe('Sun, 4/1/2018');
    });
  });

  describe('isInDateRange', () => {
    const start = new Date(2018, 3, 1);
    const end = new Date(2018, 3, 6);
    const range = eachDayOfInterval({ start, end });

    it('Should return true for the first day of the range', () => {
      const result = isInDateRange(start, range);
      expect(result).toBe(true);
    });

    it('Should return true for the last day of the range', () => {
      const result = isInDateRange(end, range);
      expect(result).toBe(true);
    });

    it('Should return true for a day in the middle of the range', () => {
      const date = addDays(start, 2);
      const result = isInDateRange(date, range);
      expect(result).toBe(true);
    });

    it('Should return false for a day before the first day of the range', () => {
      const date = subDays(start, 3);
      const result = isInDateRange(date, range);
      expect(result).toBe(false);
    });

    it('Should return false for a day after the last day of the range', () => {
      const date = addDays(end, 3);
      const result = isInDateRange(date, range);
      expect(result).toBe(false);
    });
  });

  describe('formatElapsedTime', () => {
    const inactiveValue = 'not active';

    it('Return inactiveValue when start is 0', () => {
      const result = formatElapsedTime(0, 5, inactiveValue);
      expect(result).toBe(inactiveValue);
    });

    it('Return inactiveValue when end is 0', () => {
      const result = formatElapsedTime(5, 0, inactiveValue);
      expect(result).toBe(inactiveValue);
    });

    it('Returns inactiveValue when given 0 for both', () => {
      const result = formatElapsedTime(0, 0, inactiveValue);
      expect(result).toBe(inactiveValue);
    });

    it('Returns inactiveValue when end is before start', () => {
      const result = formatElapsedTime(30, 10, inactiveValue);
      expect(result).toBe(inactiveValue);
    });

    it('Returns 00:01:00 when given times one minute apart', () => {
      const result = formatElapsedTime(500, 60500);
      expect(result).toBe('00:01:00');
    });
  });
});
