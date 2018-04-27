import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';

import { AuthEffects } from './auth.effects';

import * as historyActions from '../../../features/tracker/actions/history.actions';
import * as platformsActions from '../../../features/tracker/actions/platforms.actions';
import * as timerActions from '../../../features/tracker/actions/timer.actions';
import * as userActions from '../actions/user.actions';

import '../../../rxjs-operators';

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
        photoURL: ''
      });

      actions = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: new platformsActions.LoadOptions(),
        c: new historyActions.LoadHistoryItems(uid),
        d: new timerActions.LoadTimerInfo(uid)
      });

      expect(effects.authenticated$).toBeObservable(expected);
    });
  });

  describe('Logout', () => {
    it('Should dispatch actions to clear user data', () => {
      actions = hot('-a', { a: new userActions.Logout() });
      const expected = cold('-(bc)', {
        b: new historyActions.ClearHistoryItems(),
        c: new timerActions.ResetTimer()
      });

      expect(effects.logout$).toBeObservable(expected);
    });
  });
});
