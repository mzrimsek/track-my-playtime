import * as actions from './date-range.actions';

describe('Date Range Actions', () => {
  describe('SetThisWeek', () => {
    it('Should have correct type', () => {
      const action = new actions.SetThisWeek();
      expect(action.type).toBe(actions.SET_THIS_WEEK);
    });
  });

  describe('SetLastWeek', () => {
    it('Should have correct type', () => {
      const action = new actions.SetLastWeek();
      expect(action.type).toBe(actions.SET_LAST_WEEK);
    });
  });

  describe('SetThisMonth', () => {
    it('Should have correct type', () => {
      const action = new actions.SetThisMonth();
      expect(action.type).toBe(actions.SET_THIS_MONTH);
    });
  });

  describe('SetLastMonth', () => {
    it('Should have correct type', () => {
      const action = new actions.SetLastMonth();
      expect(action.type).toBe(actions.SET_LAST_MONTH);
    });
  });
});
