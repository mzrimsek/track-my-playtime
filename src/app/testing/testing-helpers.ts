import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../features/auth/models';

const mockUser: User = {
  uid: 'some id',
  displayName: 'Jim Bob',
  email: 'jimbob@jimbob.com',
  photoURL: 'jimbob.com/jimbob.png'
};
export const user = {
  mockUser,
  userServiceStub: {
    getUser: jasmine.createSpy('getUser').and.returnValue(mockUser)
  }
};

const fakeAuthState = new BehaviorSubject<any>(null);
const fakeSignInHandler = (): Promise<any> => {
  fakeAuthState.next(user.mockUser);
  return Promise.resolve(user.mockUser);
};
const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};
export const auth = {
  fakeAuthState,
  angularFireAuthStub: {
    authState: fakeAuthState,
    auth: {
      signInWithPopup: jasmine
        .createSpy('signInWithPopup')
        .and
        .callFake(fakeSignInHandler),
      signOut: jasmine
        .createSpy('signOut')
        .and
        .callFake(fakeSignOutHandler)
    }
  }
};

export const tracker = {
  clockServiceStub: {
    getCurrentTime: jasmine.createSpy('getCurrentTime')
  }
};
