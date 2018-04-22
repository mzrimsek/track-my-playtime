import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { provideMockActions } from '@ngrx/effects/testing';

import { AngularFireAuth } from 'angularfire2/auth';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
    it('Should dispatch Authenticated and navigate to return url when user is authenticated', () => {
      actions = hot('-a', { a: new userActions.GetUser() });
      const returnUrl = 'some/route';
      mockActivatedRoute.queryParams = { returnUrl };
      const user = {
        uid: 'some id',
        displayName: 'Jim Bob',
        email: 'jimbob@jimbob.com',
        photoURL: 'jimbob.com/jimbob.png'
      };
      const expected = cold('-(b)', {
        b: new userActions.Authenticated(user)
      });

      expect(effects.logout$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith([returnUrl]);
    });

    it('Should dispatch NotAuthenticated when user is not authenticated', () => {
      actions = hot('-a', { a: new userActions.GetUser() });
      const expected = cold('-(b)', {
        b: new userActions.NotAuthenticated()
      });

      expect(effects.getUser$).toBeObservable(expected);
    });
  });

  describe('Google Login', () => {
    it('Should dispatch GetUser', () => {
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
      expect(router.navigate).toHaveBeenCalledWith(['login']);
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
