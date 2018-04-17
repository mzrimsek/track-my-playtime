import { addDays, subDays } from 'date-fns';

import {
    formatDate, formatTime, getElapsedTimeInSeconds, getWeek, isInDateRange
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
      expect(result).toBe('4/1/2018');
    });
  });

  describe('getWeek', () => {
    it('Can get the week for a day', () => {
      const date = new Date(2018, 3, 7); // Saturday, April 7th, 2018
      const result = getWeek(date);
      expect(result).toEqual([
        new Date(2018, 3, 1),
        new Date(2018, 3, 2),
        new Date(2018, 3, 3),
        new Date(2018, 3, 4),
        new Date(2018, 3, 5),
        new Date(2018, 3, 6),
        new Date(2018, 3, 7)
      ]);
    });
  });

  describe('isInDateRange', () => {
    let start: Date;
    let range: Date[];
    beforeEach(() => {
      start = new Date(2018, 3, 1);
      range = getWeek(start);
    });

    it('Should return true for the first day of the range', () => {
      const result = isInDateRange(start, range);
      expect(result).toBe(true);
    });

    it('Should return true for the last day of the range', () => {
      const date = range[range.length - 1];
      const result = isInDateRange(date, range);
      expect(result).toBe(true);
    });

    it('Should return true for a day in the middle of the range', () => {
      const date = new Date(2018, 3, 4);
      const result = isInDateRange(date, range);
      expect(result).toBe(true);
    });

    it('Should return false for a day before the first day of the range', () => {
      const date = subDays(range[0], 3);
      const result = isInDateRange(date, range);
      expect(result).toBe(false);
    });

    it('Should return false for a day after the last day of the range', () => {
      const date = addDays(range[range.length - 1], 3);
      const result = isInDateRange(date, range);
      expect(result).toBe(false);
    });
  });
});
