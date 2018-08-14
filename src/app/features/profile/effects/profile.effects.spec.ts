import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { ProfileEffects } from './profile.effects';

import { ProfileService } from '../services/profile.service';

describe('Profile Effects', () => {
  let actions: any;
  let effects: ProfileEffects;
  let profileService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileEffects,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(ProfileEffects);
    profileService = TestBed.get(ProfileService);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });
});
