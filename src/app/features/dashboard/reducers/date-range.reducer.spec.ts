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
      const startLastWeek = subDays(startDay, 7);
      expect(formatDate(newState.startDay)).toBe(formatDate(startLastWeek));
    });

    it('Should have correct end day', () => {
      const endLastWeek = subDays(startDay, 1);
      expect(formatDate(newState.endDay)).toBe(formatDate(endLastWeek));
    });

    it('Should have correct type', () => {
      expect(newState.type).toBe('LAST_WEEK');
    });
  });

  describe('When SetThisMonth is dispatched', () => {
    const newState = reducer(initialState, new actions.SetThisMonth());

    it('Should have correct start day', () => {
      const startThisMonth = startOfMonth(startDay);
      expect(formatDate(newState.startDay)).toBe(formatDate(startThisMonth));
    });

    it('Should have correct end day', () => {
      const endThisMonth = endOfMonth(startDay);
      expect(formatDate(newState.endDay)).toBe(formatDate(endThisMonth));
    });

    it('Should have correct type', () => {
      expect(newState.type).toBe('THIS_MONTH');
    });
  });

  describe('When SetLastMonth is dispatched', () => {
    const newState = reducer(initialState, new actions.SetLastMonth());

    it('Should have correct start day', () => {
      const startThisMonth = startOfMonth(startDay);
      const endLastMonth = subDays(startThisMonth, 1);
      const startLastMonth = startOfMonth(endLastMonth);
      expect(formatDate(newState.startDay)).toBe(formatDate(startLastMonth));
    });

    it('Should have correct end day', () => {
      const startThisMonth = startOfMonth(startDay);
      const endLastMonth = subDays(startThisMonth, 1);
      expect(formatDate(newState.endDay)).toBe(formatDate(endLastMonth));
    });

    it('Should have correct type', () => {
      expect(newState.type).toBe('LAST_MONTH');
    });
  });
});

const now = new Date();
const startDay = startOfWeek(now);
const endDay = endOfWeek(now);
const initialState: State = {
  startDay,
  endDay,
  type: 'THIS_WEEK'
};
