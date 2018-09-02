import * as actions from './app.actions';

describe('App Actions', () => {
  describe('Error', () => {
    it('Should have correct type', () => {
      const action = new actions.Error('', '');
      expect(action.type).toBe(actions.APP_ERROR);
    });

    it('Should have correct action', () => {
      const actionType = 'Some action';
      const action = new actions.Error(actionType, '');

      expect(action.action).toBe(actionType);
    });

    it('Should have correct message', () => {
      const message = 'Something went terribly wrong';
      const action = new actions.Error('', message);

      expect(action.message).toBe(message);
    });
  });
});
