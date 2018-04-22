import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { provideMockActions } from '@ngrx/effects/testing';

import { AngularFireAuth } from 'angularfire2/auth';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserEffects } from './user.effects';

import * as userActions from '../actions/user.actions';

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
    it('Should dispatch Authenticated when user is authenticated', () => {
      fail();
    });

    it('Should navigate to return url when user is authenticated', () => {
      fail();
    });

    it('Should dispatch NotAuthenticated when user is not authenticated', () => {
      fail();
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
    signOut: jasmine
      .createSpy('signOut')
      .and
      .callFake(fakeSignOutHandler),
  },
};

const mockActivatedRoute = {
  queryParams: {}
};
