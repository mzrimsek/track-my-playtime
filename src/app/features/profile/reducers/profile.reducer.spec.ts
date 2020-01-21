import * as actions from 'features/profile/actions/profile.actions';

import { Profile } from 'features/profile/models';

import { reducer, State } from './profile.reducer';

describe('Profile Reducer', () => {
  it('Should set profile info when LoadProfileSucceeded is dispatched', () => {
    const initialState: State = {
      displayName: ''
    };
    const profile: Profile = {
      displayName: 'profile name'
    };

    const newState = reducer(initialState, new actions.LoadProfileSucceeded(profile));

    expect(newState).toEqual(profile);
  });

  it('Should set displayName when SetProfileDisplayNameSucceeded is dispatched', () => {
    const initialState: State = {
      displayName: ''
    };
    const newState = reducer(initialState, new actions.SetProfileDisplayNameSucceeded('profile name'));
    expect(newState).toEqual({
      displayName: 'profile name'
    });
  });
});
