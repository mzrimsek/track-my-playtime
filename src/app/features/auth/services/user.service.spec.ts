import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { UserService } from './user.service';

import * as actions from 'features/auth/actions/user.actions';
import * as profileActions from 'features/profile/actions/profile.actions';

import * as fromRoot from 'app/reducers/root.reducer';
import * as fromAuth from 'features/auth/reducers/root.reducer';
import * as fromProfile from 'features/profile/reducers/root.reducer';

import { User } from 'features/auth/models';
import { Profile } from 'features/profile/models';

describe('User Service', () => {
  let service: UserService;
  let store: Store<fromAuth.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers),
          'profile': combineReducers(fromProfile.reducers)
        })
      ],
      providers: [UserService]
    });

    service = TestBed.get(UserService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {
    it('Should return default data when not authenticated', () => {
      const result = service.getUser();
      result.subscribe(res => {
        expect(res).toEqual({
          uid: '',
          displayName: '',
          email: '',
          photoURL: '',
          providerId: ''
        });
      });
    });

    it('Should return the user when authenticated', () => {
      const user: User = {
        uid: 'some id',
        displayName: 'Jim Bob',
        email: 'jimbob@jimbob.com',
        photoURL: 'jimbob.com/jimbob.png',
        providerId: 'google.com'
      };
      store.dispatch(new actions.Authenticated(user));

      const result = service.getUser();
      result.subscribe(res => {
        expect(res).toEqual(user);
      });
    });
  });

  describe('getUserInfo', () => {
    beforeEach(() => {
      const user: User = {
        uid: 'some id',
        displayName: 'Jim Bob',
        email: 'jimbob@jimbob.com',
        photoURL: 'jimbob.com/jimbob.png',
        providerId: 'google.com'
      };
      store.dispatch(new actions.Authenticated(user));
    });

    it('Should return user info', () => {
      const profile: Profile = {
        displayName: 'Jimmy'
      };
      store.dispatch(new profileActions.LoadProfileSucceeded(profile));

      const result = service.getUserInfo();
      result.subscribe(res => {
        expect(res).toEqual({
          displayName: 'Jimmy',
          imgSrc: 'jimbob.com/jimbob.png',
          email: 'jimbob@jimbob.com',
          provider: 'GOOGLE'
        });
      });
    });
  });

  describe('logout', () => {
    it('Should dispatch Logout', () => {
      service.logout();
      expect(store.dispatch).toHaveBeenCalledWith(new actions.Logout());
    });
  });
});
