import * as actions from './status.actions';

describe('Status Actions', () => {
  describe('SetAttemptingLogin', () => {
    it('Should have correct type', () => {
      const action = new actions.SetAttemptingLogin(false);
      expect(action.type).toBe(actions.SET_ATTEMPTING_LOGIN);
    });

    it('Should have correct attemptingLogin', () => {
      const action = new actions.SetAttemptingLogin(true);
      expect(action.attemptingLogin).toBe(true);
    });
  });

  describe('SetValidationMessage', () => {
    it('Should have correct type', () => {
      const action = new actions.SetValidationMessage('');
      expect(action.type).toBe(actions.SET_VALIDATION_MESSAGE);
    });

    it('Should have correct validationMessage', () => {
      const action = new actions.SetValidationMessage('some message');
      expect(action.validationMessage).toBe('some message');
    });
  });
});
