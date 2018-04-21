import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { AuthEffects } from './auth.effects';
import { UserEffects } from './user.effects';

describe('User Effects', () => {
  let actions: any;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions)
      ]
    });
    effects = TestBed.get(UserEffects);
  });

  describe('Get User', () => {

  });

  describe('Google Login', () => {

  });

  describe('Logout', () => {

  });
});
