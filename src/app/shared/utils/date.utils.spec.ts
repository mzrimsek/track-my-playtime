import { formatTime, getElapsedTimeInSeconds } from './date.utils';

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
});
