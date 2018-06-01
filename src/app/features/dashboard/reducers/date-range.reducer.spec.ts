import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, subDays } from 'date-fns';

import * as actions from '../actions/date-range.actions';

import { reducer, State } from './date-range.reducer';

import { formatDate } from '../../../shared/utils/date.utils';

describe('Date Range Reducer', () => {
  it('Should have initial state when SetThisWeek is dispatched', () => {
    const newState = reducer(initialState, new actions.SetThisWeek());
    expect(newState).toEqual(initialState);
  });

  describe('When SetLastWeek is dispatched', () => {
    const newState = reducer(initialState, new actions.SetLastWeek());

    it('Should have correct start day', () => {
      const startThisWeek = startOfWeek(now);
      const startLastWeek = subDays(startThisWeek, 7);
      expect(formatDate(newState.startDay)).toBe(formatDate(startLastWeek));
    });

    it('Should have correct end day', () => {
      const startThisWeek = startOfWeek(now);
      const endLastWeek = subDays(startThisWeek, 1);
      expect(formatDate(newState.endDay)).toBe(formatDate(endLastWeek));
    });

    it('Should have correct type', () => {
      expect(newState.type).toBe('LAST_WEEK');
    });
  });

  describe('When SetThisMonth is dispatched', () => {
    const newState = reducer(initialState, new actions.SetThisMonth());

    it('Should have correct start day', () => {
      const startThisMonth = startOfMonth(now);
      expect(formatDate(newState.startDay)).toBe(formatDate(startThisMonth));
    });

    it('Should have correct end day', () => {
      const endThisMonth = endOfMonth(now);
      expect(formatDate(newState.endDay)).toBe(formatDate(endThisMonth));
    });

    it('Should have correct type', () => {
      expect(newState.type).toBe('THIS_MONTH');
    });
  });

  describe('When SetLastMonth is dispatched', () => {
    const newState = reducer(initialState, new actions.SetLastMonth());

    it('Should have correct start day', () => {
      const startThisMonth = startOfMonth(now);
      const endLastMonth = subDays(startThisMonth, 1);
      const startLastMonth = startOfMonth(endLastMonth);
      expect(formatDate(newState.startDay)).toBe(formatDate(startLastMonth));
    });

    it('Should have correct end day', () => {
      const startThisMonth = startOfMonth(now);
      const endLastMonth = subDays(startThisMonth, 1);
      expect(formatDate(newState.endDay)).toBe(formatDate(endLastMonth));
    });

    it('Should have correct type', () => {
      expect(newState.type).toBe('LAST_MONTH');
    });
  });
});

const now = new Date();
const initialState: State = {
  startDay: startOfWeek(now),
  endDay: endOfWeek(now),
  type: 'THIS_WEEK'
};
