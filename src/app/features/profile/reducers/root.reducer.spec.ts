import { State as InfoState } from './profile.reducer';
import { _selectInfo, ProfileState, State } from './root.reducer';

describe('Profile Root Reducer', () => {
  describe('Info State Selectors', () => {
    describe('_selectInfo', () => {
      it('Should return profile info', () => {
        const info: InfoState = {
          displayName: 'profile name'
        };
        const profileState: ProfileState = {
          info
        };
        const state: State = { profile: profileState };

        const result = _selectInfo(state);

        expect(result).toBe(info);
      });
    });
  });
});
