import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';

import { AuthEffects } from './auth.effects';

import * as historyActions from '../../../shared/actions/history.actions';
import * as platformsActions from '../../../shared/actions/platforms.actions';
import * as progressActions from '../../../shared/actions/progress.actions';
import * as timerActions from '../../../shared/actions/timer.actions';
import * as userActions from '../../auth/actions/user.actions';
import * as profileActions from '../../profile/actions/profile.actions';

describe('Auth Effects', () => {
  let actions: any;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(AuthEffects);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Authenticated', () => {
    it('Should dispatch actions to load data', () => {
      const uid = 'some id';
      const action = new userActions.Authenticated({
        uid,
        displayName: '',
        email: '',
        photoURL: '',
        providerId: ''
      });

      actions = hot('-a', { a: action });
      const expected = cold('-(bcdef)', {
        b: new platformsActions.LoadOptions(),
        c: new historyActions.LoadHistoryItems(uid),
        d: new timerActions.LoadTimerInfo(uid),
        e: new progressActions.LoadProgressItems(uid),
        f: new profileActions.LoadProfile(uid)
      });

      expect(effects.authenticated$).toBeObservable(expected);
    });
  });
});
