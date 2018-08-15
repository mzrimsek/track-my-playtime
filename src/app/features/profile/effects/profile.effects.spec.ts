import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

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

      spyOn(profileService, 'getProfile').and.callFake(() => Observable.throw({ message }));
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
});
