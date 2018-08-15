import * as actions from './profile.actions';

import { profile } from '../../../test-helpers/profile';

describe('Profile Actions', () => {
  describe('LoadProfile', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadProfile('');
      expect(action.type).toBe(actions.LOAD_PROFILE);
    });

    it('Should have correct userId', () => {
      const action = new actions.LoadProfile('some id');
      expect(action.userId).toBe('some id');
    });
  });

  describe('LoadProfileSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadProfileSucceeded(profile.profileWithDisplayName);
      expect(action.type).toBe(actions.LOAD_PROFILE_SUCCEEDED);
    });

    it('Should have correct profile', () => {
      const action = new actions.LoadProfileSucceeded(profile.profileWithDisplayName);
      expect(action.profile).toEqual(profile.profileWithDisplayName);
    });
  });

  describe('ClearProfile', () => {
    it('Should have correct type', () => {
      const action = new actions.ClearProfile();
      expect(action.type).toBe(actions.CLEAR_PROFILE);
    });
  });
});
