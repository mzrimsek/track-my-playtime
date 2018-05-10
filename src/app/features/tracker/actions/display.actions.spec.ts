import * as actions from './display.actions';

describe('Display Actions', () => {
  describe('IncrementDays', () => {
    it('Should have correct type', () => {
      const action = new actions.IncrementDaysToShow(0);
      expect(action.type).toBe(actions.INCREMENT_DAYS_TO_SHOW);
    });

    it('Should have correct amount', () => {
      const action = new actions.IncrementDaysToShow(12);
      expect(action.amount).toBe(12);
    });
  });
});
