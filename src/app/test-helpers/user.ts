import { Observable } from 'rxjs/Observable';

import { User, UserInfo } from '../features/auth/models';

export namespace user {
  export const mockUser: User = {
    uid: 'some id',
    displayName: 'Jim Bob',
    email: 'jimbob@jimbob.com',
    photoURL: 'jimbob.com/jimbob.png'
  };

  export const mockUserInfo: UserInfo = {
    displayName: 'Jimmy',
    email: mockUser.email,
    imgSrc: mockUser.photoURL
  };

  export const userServiceStub = {
    getUser: jasmine.createSpy('getUser').and.returnValue(Observable.of(mockUser)),
    getUserInfo: jasmine.createSpy('getUserInfo').and.returnValue(Observable.of(mockUserInfo))
  };
}
