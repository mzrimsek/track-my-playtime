import { of } from 'rxjs';

import { User, UserInfo } from '../features/auth/models';

export namespace user {
  export const mockUser: User = {
    uid: 'some id',
    displayName: 'Jim Bob',
    email: 'jimbob@jimbob.com',
    photoURL: 'jimbob.com/jimbob.png',
    providerId: 'google.com'
  };

  export const mockUserInfo: UserInfo = {
    displayName: 'Jimmy',
    email: mockUser.email,
    imgSrc: mockUser.photoURL,
    provider: 'GOOGLE'
  };

  export const userServiceStub = {
    getUser: jasmine.createSpy('getUser').and.returnValue(of(mockUser)),
    getUserInfo: jasmine.createSpy('getUserInfo').and.returnValue(of(mockUserInfo))
  };
}
