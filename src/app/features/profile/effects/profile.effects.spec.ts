import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { ReplaySubject, throwError } from 'rxjs';

import { ProfileEffects } from './profile.effects';

import { ProfileService } from '../services/profile.service';

import * as appActions from '../../../actions/app.actions';
import * as profileActions from '../actions/profile.actions';

import { profile } from '../../../test-helpers/profile';

describe('Profile Effects', () => {
  let actions: any;
  let effects: ProfileEffects;
  let profileService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileEffects,
        provideMockActions(() => actions),
        { provide: ProfileService, useClass: profile.MockProfileService }
      ]
    });

    effects = TestBed.get(ProfileEffects);
    profileService = TestBed.get(ProfileService);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Load Profile', () => {
    it('Should dispatch LoadProfileSucceeded', () => {
      const action = new profileActions.LoadProfile('some user id');

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new profileActions.LoadProfileSucceeded(profile.profileWithDisplayName)
      });

      expect(effects.loadProfile$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new profileActions.LoadProfile('some user id');
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(profileActions.LOAD_PROFILE, message)
      });

      spyOn(profileService, 'getProfile').and.callFake(() => throwError({ message }));
      expect(effects.loadProfile$).toBeObservable(expected);
    });

    it('Should call ProfileService getProfile', () => {
      const action = new profileActions.LoadProfile('some user id');

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(profileService, 'getProfile').and.callThrough();
      effects.loadProfile$.subscribe(() => {
        expect(profileService.getProfile).toHaveBeenCalled();
      });
    });
  });

  describe('Set Display Name', () => {
    it('Should dispatch SetProfileDisplayNameSucceeded', () => {
      const displayName = 'some name';
      const action = new profileActions.SetProfileDisplayName('', displayName);

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new profileActions.SetProfileDisplayNameSucceeded(displayName)
      });

      expect(effects.setDisplayName$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new profileActions.SetProfileDisplayName('', '');
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(profileActions.SET_PROFILE_DISPLAYNAME, message)
      });

      spyOn(profileService, 'setDisplayName').and.callFake(() => throwError({ message }));
      expect(effects.setDisplayName$).toBeObservable(expected);
    });

    it('Should call ProfileService setDisplayName', () => {
      const action = new profileActions.SetProfileDisplayName('', '');

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(profileService, 'setDisplayName').and.callThrough();
      effects.loadProfile$.subscribe(() => {
        expect(profileService.setDisplayName).toHaveBeenCalled();
      });
    });
  });
});
