import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import * as fromRouter from '@ngrx/router-store';

import * as appActions from 'app/actions/app.actions';
import { user } from 'app/test-helpers';
import * as statusActions from 'features/auth/actions/status.actions';
import * as userActions from 'features/auth/actions/user.actions';
import { cold, hot } from 'jasmine-marbles';

import { Error } from 'app/models';

import { getValidationMessage } from 'features/auth/utils/validation.utils';

import { StatusEffects } from './status.effects';

describe('Status Effects', () => {
  let actions: any;
  let effects: StatusEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatusEffects,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(StatusEffects);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Error', () => {
    it('Should dispatch SetAttemptingLogin and SetValidationMessage', () => {
      const action = new appActions.Error(userActions.GOOGLE_LOGIN, 'Error!');
      const validationMessage = getValidationMessage(action as Error);

      actions = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: new statusActions.SetAttemptingLogin(false),
        c: new statusActions.SetValidationMessage(validationMessage)
      });

      expect(effects.error$).toBeObservable(expected);
    });
  });

  describe('Route Navigate', () => {
    it('Should dispatch SetValidationMessage', () => {
      const action = {
        type: fromRouter.ROUTER_NAVIGATION
      };

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new statusActions.SetValidationMessage('')
      });

      expect(effects.routeNavigate$).toBeObservable(expected);
    });
  });

  describe('Login', () => {
    it('Should dispatch SetAttemptingLogin with EmailLogin', () => {
      const action = new userActions.EmailLogin('', '');

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new statusActions.SetAttemptingLogin(true)
      });

      expect(effects.login$).toBeObservable(expected);
    });

    it('Should dispatch SetAttemptingLogin with SignUp', () => {
      const action = new userActions.SignUp('', '');

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new statusActions.SetAttemptingLogin(true)
      });

      expect(effects.login$).toBeObservable(expected);
    });

    it('Should dispatch SetAttemptingLogin with GoogleLogin', () => {
      const action = new userActions.GoogleLogin();

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new statusActions.SetAttemptingLogin(true)
      });

      expect(effects.login$).toBeObservable(expected);
    });

    it('Should dispatch SetAttemptingLogin with FacebookLogin', () => {
      const action = new userActions.FacebookLogin();

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new statusActions.SetAttemptingLogin(true)
      });

      expect(effects.login$).toBeObservable(expected);
    });

    it('Should dispatch SetAttemptingLogin with TwitterLogin', () => {
      const action = new userActions.TwitterLogin();

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new statusActions.SetAttemptingLogin(true)
      });

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('Post Login', () => {
    it('Should dispatch SetAttemptingLogin for Authenticated', () => {
      const action = new userActions.Authenticated(user.mockUser);

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new statusActions.SetAttemptingLogin(false)
      });

      expect(effects.postLogin$).toBeObservable(expected);
    });

    it('Should dispatch SetAttemptingLogin for NotAuthenticated', () => {
      const action = new userActions.NotAuthenticated();

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new statusActions.SetAttemptingLogin(false)
      });

      expect(effects.postLogin$).toBeObservable(expected);
    });
  });
});
