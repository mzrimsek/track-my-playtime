import { State as DateRangeState } from './date-range.reducer';
import { _selectDateList, _selectRangeType, DashboardState, State } from './root.reducer';

describe('Dashboard Root Reducer', () => {
  describe('Date Range State Selectors', () => {
    const dateRange: DateRangeState = {
      startDay: new Date(2018, 3, 5),
      endDay: new Date(2018, 3, 8),
      type: 'THIS_WEEK'
    };
    const dashboardState: DashboardState = {
      dateRange
    };
    const state: State = { dashboard: dashboardState };

    describe('_selectDateList', () => {
      it('Should return list of dates in range of start and end', () => {
        const result = _selectDateList(state);
        expect(result).toEqual([
          new Date(2018, 3, 5),
          new Date(2018, 3, 6),
          new Date(2018, 3, 7),
          new Date(2018, 3, 8)
        ]);
      });
    });

    describe('_selectRangeType', () => {
      it('Should return date range type', () => {
        const result = _selectRangeType(state);
        expect(result).toBe('THIS_WEEK');
      });
    });
  });
});
