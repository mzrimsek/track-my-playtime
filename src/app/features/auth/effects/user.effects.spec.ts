import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { provideMockActions } from '@ngrx/effects/testing';

import { AngularFireAuth } from 'angularfire2/auth';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { UserEffects } from './user.effects';

import * as userActions from '../actions/user.actions';

import { User } from '../models';

describe('User Effects', () => {
  let actions: any;
  let effects: UserEffects;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });
    effects = TestBed.get(UserEffects);
  });

  describe('Get User', () => {
    it('Should dispatch Authenticated', () => {
      actions = hot('-a', { a: new userActions.GetUser() });
      const user: User = {
        uid: 'some id',
        displayName: 'Jim Bob',
        email: 'jimbob@jimbob.com',
        photoURL: 'jimbob.com/jimbob.png'
      };
      const expected = cold('-(b)', {
        b: new userActions.Authenticated(user)
      });

      expect(effects.getUser$).toBeObservable(expected);
    });

    it('Should navigate to return url when user is authenticated', () => {
      const returnUrl = 'some/route';
      mockActivatedRoute.queryParams = { returnUrl };

      actions = new ReplaySubject(1);
      actions.next(new userActions.GetUser());

      effects.getUser$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([returnUrl]);
      });
    });

    it('Should dispatch NotAuthenticated when user is not authenticated', () => {
      actions = hot('-a', { a: new userActions.GetUser() });
      const expected = cold('-(b)', {
        b: new userActions.NotAuthenticated()
      });

      expect(effects.getUser$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      fail();
    });
  });

  describe('Google Login', () => {
    it('Should dispatch GetUser', () => {
      actions = hot('-a', { a: new userActions.GoogleLogin() });
      const expected = cold('-(b)', {
        b: new userActions.GetUser()
      });
      expect(effects.googleLogin$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      fail();
    });
  });

  describe('Logout', () => {
    it('Should dispatch NotAuthenticated and navigate to login', () => {
      actions = hot('-a', { a: new userActions.Logout() });
      const expected = cold('-(b)', {
        b: new userActions.NotAuthenticated()
      });

      expect(effects.logout$).toBeObservable(expected);
    });

    it('Should navigate to login', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.Logout());

      effects.logout$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['login']);
      });
    });

    it('Should dispatch Error on error', () => {
      fail();
    });
  });
});

const fakeAuthState = new BehaviorSubject(null);

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

const angularFireAuthStub = {
  authState: fakeAuthState,
  auth: {
    signInWithPopup: Promise.resolve({
      user: fakeAuthState
    }),
    signOut: jasmine
      .createSpy('signOut')
      .and
      .callFake(fakeSignOutHandler),
  },
};

const mockActivatedRoute = {
  queryParams: {}
};
