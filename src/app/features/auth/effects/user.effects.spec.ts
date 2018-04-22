import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { UserEffects } from './user.effects';

describe('User Effects', () => {
  let actions: any;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions)
      ]
    });
    effects = TestBed.get(UserEffects);
  });

  describe('Get User', () => {
    it('Should dispatch Authenticated when user is authenticated', () => {

    });

    it('Should navigate to return url when user is authenticated', () => {

    });

    it('Should dispatch NotAuthenticated when user is not authenticated', () => {

    });
  });

  describe('Google Login', () => {
    it('Should dispatch GetUser', () => {

    });
  });

  describe('Logout', () => {
    it('Should dispatch NotAuthenticated', () => {

    });

    it('Should navgiate to login', () => {

    });
  });
});
