import { User as AuthUser } from '@firebase/auth-types';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

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

  export class MockAuthService {
    private authState: Observable<any>;

    constructor() {
      this.authState = Observable.of(null);
    }

    getAuthState(): Observable<AuthUser | null> {
      return this.authState;
    }

    signInWithGoogle(): Observable<any> {
      this.authState = Observable.of(user.mockUser);
      return Observable.of('Logged in with Google');
    }

    signOut(): Observable<any> {
      this.authState = Observable.of(null);
      return Observable.of('Logged out');
    }
  }
}
