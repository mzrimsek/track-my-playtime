import { getNumEntriesToShow } from './resize-utils';

describe('Resize Utils', () => {
  describe('getNumEntriesToShow', () => {
    it('Should set to 5 when height is less than 700', () => {
      const result = getNumEntriesToShow(699);
      expect(result).toBe(5);
    });

    it('Should set to height divided by 70 when height is 700 or more', () => {
      const result = getNumEntriesToShow(1000);
      const expected = Math.floor(1000 / 70);
      expect(result).toBe(expected);
    });
  });
});
