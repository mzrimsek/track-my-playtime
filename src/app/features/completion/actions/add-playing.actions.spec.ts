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

  describe('Reset', () => {
    it('Should have correct type', () => {
      const action = new actions.Reset();
      expect(action.type).toBe(actions.RESET);
    });
  });

  describe('Save', () => {
    it('Should have correct type', () => {
      const action = new actions.Save({
        userId: '',
        startEntryId: ''
      });
      expect(action.type).toBe(actions.SAVE);
    });

    it('Should have correct data', () => {
      const action = new actions.Save({
        userId: 'some user id',
        startEntryId: 'some entry id',
      });
      expect(action.addPlaying).toEqual({
        userId: 'some user id',
        startEntryId: 'some entry id',
      });
    });
  });

  describe('Save Succeeded', () => {
    it('Should have correct type', () => {
      const action = new actions.SaveSucceeded({
        id: '',
        startEntryId: '',
        endEntryId: ''
      });
      expect(action.type).toBe(actions.SAVE_SUCCEEDED);
    });

    it('Should have correct data', () => {
      const action = new actions.SaveSucceeded({
        id: 'some id',
        startEntryId: 'some entry id',
        endEntryId: ''
      });
      expect(action.item).toEqual({
        id: 'some id',
        startEntryId: 'some entry id',
        endEntryId: ''
      });
    });
  });
});
