import { User as AuthUser } from '@firebase/auth-types';

import { State as StatusState } from 'features/auth/reducers/status.reducer';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
        .callFake(fakeSignOutHandler),
      createUserWithEmailAndPassword: jasmine
        .createSpy('createUserWithEmailAndPassword')
        .and
        .callFake(fakeSignInHandler),
      signInWithEmailAndPassword: jasmine
        .createSpy('signInWithEmailAndPassword')
        .and
        .callFake(fakeSignInHandler),
      sendPasswordResetEmail: jasmine
        .createSpy('sendPasswordResetEmail')
        .and
        .callFake(() => Promise.resolve())
    }
  };

  export const initialStatusState: StatusState = {
    attemptingLogin: false,
    validationMessage: ''
  };

  export class MockAuthService {
    private authState: Observable<any>;

    constructor() {
      this.authState = of(null);
    }

    getAuthState(): Observable<AuthUser | null> {
      return this.authState;
    }

    signInWithGoogle(): Observable<any> {
      this.authState = of({
        ...user.mockUser,
        providerData: [{
          ...user.mockUser
        }]
      });
      return of('Logged in with Google');
    }

    signInWithFacebook(): Observable<any> {
      this.authState = of({
        ...user.mockUser,
        providerData: [{
          ...user.mockUser
        }]
      });
      return of('Logged in with Facebook');
    }

    signInWithTwitter(): Observable<any> {
      this.authState = of({
        ...user.mockUser,
        providerData: [{
          ...user.mockUser
        }]
      });
      return of('Logged in with Twitter');
    }

    signOut(): Observable<any> {
      this.authState = of(null);
      return of('Logged out');
    }

    signUpWithEmail(): Observable<any> {
      this.authState = of(user.mockUser);
      return of('Signed up with Email');
    }

    signInWithEmail(): Observable<any> {
      this.authState = of(user.mockUser);
      return of('Signed in with Email');
    }

    resetPassword(): Observable<any> {
      return of('Password reset email sent');
    }
  }
}
