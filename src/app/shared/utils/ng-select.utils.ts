import { NgSelectValue } from '../models';

export const getValueFromNgSelect = (value: string | NgSelectValue | null | undefined): string => {
  if (value) {
    if (typeof value === 'string') {
      return value;
    }
    return getValueFromNgSelect(value.label);
  }
  return '';
};
