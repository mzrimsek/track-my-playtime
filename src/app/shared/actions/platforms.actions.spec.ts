import * as actions from 'shared/actions/platforms.actions';

describe('Platforms Actions', () => {
  describe('LoadOptions', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadOptions();
      expect(action.type).toBe(actions.LOAD_OPTIONS);
    });
  });

  describe('LoadOptionsSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadOptionsSucceeded([]);
      expect(action.type).toBe(actions.LOAD_OPTIONS_SUCCEEDED);
    });

    it('Should have correct platforms', () => {
      const platforms = [
        'Game Box 720',
        'Nipkendo Scratch',
        'Dudestation 69'
      ];
      const action = new actions.LoadOptionsSucceeded(platforms);

      expect(action.platforms).toEqual(platforms);
    });
  });
});
