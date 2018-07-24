import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { user } from './user';

export namespace auth {
  export const fakeAuthState = new BehaviorSubject<any>(null);

  const fakeSignInHandler = (): Promise<any> => {
    fakeAuthState.next(user.mockUser);
    return Promise.resolve(user.mockUser);
  };
  const fakeSignOutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    return Promise.resolve();
  };
  export const angularFireAuthStub = {
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
  };
}
