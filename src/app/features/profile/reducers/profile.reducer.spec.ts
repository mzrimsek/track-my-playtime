import * as actions from '../actions/profile.actions';

import { reducer, State } from './profile.reducer';

import { Profile } from '../models';

describe('Profile Reducer', () => {
  it('Should clear profile info when ClearProfile is dispatched', () => {
    const initialState: State = {
      displayName: 'profile name'
    };
    const newState = reducer(initialState, new actions.ClearProfile());
    expect(newState).toEqual({
      displayName: ''
    });
  });

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
