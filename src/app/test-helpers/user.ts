import { User } from '../features/auth/models';

export namespace user {
  export const mockUser: User = {
    uid: 'some id',
    displayName: 'Jim Bob',
    email: 'jimbob@jimbob.com',
    photoURL: 'jimbob.com/jimbob.png'
  };

  export const userServiceStub = {
    getUser: jasmine.createSpy('getUser').and.returnValue(mockUser)
  };
}
