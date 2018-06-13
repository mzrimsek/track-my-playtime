import * as actions from './add-playing.actions';

describe('Add Playing Actions', () => {
  describe('SetGame', () => {
    it('Should have correct type', () => {
      const action = new actions.SetGame('');
      expect(action.type).toBe(actions.SET_GAME);
    });

    it('Should have correct game', () => {
      const action = new actions.SetGame('Some Game');
      expect(action.game).toBe('Some Game');
    });
  });

  describe('SetPlatform', () => {
    it('Should have correct type', () => {
      const action = new actions.SetPlatform('');
      expect(action.type).toBe(actions.SET_PLATFORM);
    });

    it('Should have correct game', () => {
      const action = new actions.SetPlatform('Some Platform');
      expect(action.platform).toBe('Some Platform');
    });
  });

  describe('SetStartTime', () => {
    it('Should have correct type', () => {
      const action = new actions.SetStartTime(0);
      expect(action.type).toBe(actions.SET_STARTTIME);
    });

    it('Should have correct game', () => {
      const action = new actions.SetStartTime(15);
      expect(action.startTime).toBe(15);
    });
  });
});
