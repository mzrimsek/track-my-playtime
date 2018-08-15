import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { UserService } from './user.service';

import * as profileActions from '../../profile/actions/profile.actions';
import * as actions from '../actions/user.actions';

import * as fromProfile from '../../../features/profile/reducers/root.reducer';
import * as fromRoot from '../../../reducers/root.reducer';
import * as fromAuth from '../reducers/root.reducer';

import { Profile } from '../../profile/models';
import { User } from '../models';

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
    spyOn(store, 'select').and.callThrough();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {
    it('Should select user', () => {
      service.getUser();
      expect(store.select).toHaveBeenCalledWith(fromAuth._selectUserData);
    });

    it('Should return default data when not authenticated', () => {
      const result = service.getUser();
      expect(result).toEqual({
        uid: '',
        displayName: '',
        email: '',
        photoURL: ''
      });
    });

    it('Should return the user when authenticated', () => {
      const user: User = {
        uid: 'some id',
        displayName: 'Jim Bob',
        email: 'jimbob@jimbob.com',
        photoURL: 'jimbob.com/jimbob.png'
      };
      store.dispatch(new actions.Authenticated(user));

      const result = service.getUser();

      expect(result).toEqual(user);
    });
  });

  describe('getUserInfo', () => {
    beforeEach(() => {
      const user: User = {
        uid: 'some id',
        displayName: 'Jim Bob',
        email: 'jimbob@jimbob.com',
        photoURL: 'jimbob.com/jimbob.png'
      };
      store.dispatch(new actions.Authenticated(user));
      service.getUser();
    });

    it('Should select userInfo', () => {
      service.getUserInfo();
      expect(store.select).toHaveBeenCalledWith(fromProfile._selectInfo);
    });

    it('Should return user info', () => {
      const profile: Profile = {
        displayName: 'Jimmy'
      };
      store.dispatch(new profileActions.LoadProfileSucceeded(profile));

      const result = service.getUserInfo();

      expect(result).toEqual({
        displayName: 'Jimmy',
        imgSrc: 'jimbob.com/jimbob.png',
        email: 'jimbob@jimbob.com'
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
