import { NgSelectValue } from 'shared/models';

import { getValueFromNgSelect } from './ng-select.utils';

describe('NgSelect Utils', () => {
  describe('getGameFromNgSelect', () => {
    it('Should return empty string if value is null', () => {
      const value = null;
      const result = getValueFromNgSelect(value);
      expect(result).toBe('');
    });

    it('Should return empty string if value is undefined', () => {
      const value = undefined;
      const result = getValueFromNgSelect(value);
      expect(result).toBe('');
    });

    it('Should return value if it is a string', () => {
      const value = 'some game';
      const result = getValueFromNgSelect(value);
      expect(result).toBe('some game');
    });

    it('Should return empty string if NgSelectValue if label is undefined', () => {
      const value: NgSelectValue = {
        label: undefined
      };
      const result = getValueFromNgSelect(value);
      expect(result).toBe('');
    });

    it('Should return empty string if NgSelectValue if label is null', () => {
      const value: NgSelectValue = {
        label: null
      };
      const result = getValueFromNgSelect(value);
      expect(result).toBe('');
    });

    it('Should return label if NgSelectValue has label', () => {
      const value: NgSelectValue = {
        label: 'some game'
      };
      const result = getValueFromNgSelect(value);
      expect(result).toBe('some game');
    });
  });
});
