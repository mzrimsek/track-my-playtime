import * as actions from './tab.actions';

describe('Tab Actions', () => {
  describe('SetVisibleTab', () => {
    it('Should have correct type', () => {
      const action = new actions.SetVisibleTab('PLAYING');
      expect(action.type).toBe(actions.SET_VISIBLE_TAB);
    });

    it('Should have correct tab', () => {
      const action = new actions.SetVisibleTab('COMPLETED');
      expect(action.tab).toBe('COMPLETED');
    });
  });
});
