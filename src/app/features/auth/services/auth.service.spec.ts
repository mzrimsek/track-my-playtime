import { TestBed } from '@angular/core/testing';

import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';

describe('Auth Service', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthStub }
      ]
    });

    service = TestBed.get(AuthService);
    afAuth = TestBed.get(AngularFireAuth);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAuthState', () => {
    let isAuth$: Subscription;
    let isAuthRef: boolean;

    beforeEach(() => {
      isAuth$ = service.getAuthState()
        .map(user => user !== null)
        .subscribe(isAuth => isAuthRef = isAuth);
    });

    afterEach(() => {
      fakeAuthState.next(null);
      isAuth$.unsubscribe();
    });

    it('Should return null when not authenticated', () => {
      expect(isAuthRef).toBe(false);
    });

    it('Should return user info when authenticated ', () => {
      service.signInWithGoogle();
      expect(isAuthRef).toBe(true);
    });
  });

  describe('signInWithGoogle', () => {
    it('Should call AngularFireAuth signInWithPopup', () => {
      service.signInWithGoogle();
      expect(afAuth.auth.signInWithPopup).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('Should call AngularFireAuth signOut', () => {
      service.signOut();
      expect(afAuth.auth.signOut).toHaveBeenCalled();
    });
  });
});

const mockUser = {
  uid: 'some id',
  displayName: 'Jim Bob',
  email: 'jimbob@jimbob.com',
  photoURL: 'jimbob.com/jimbob.png'
};

const fakeAuthState: BehaviorSubject<any> = new BehaviorSubject(null);

const fakeSignInHandler = (): Promise<any> => {
  fakeAuthState.next(mockUser);
  return Promise.resolve(mockUser);
};

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

const angularFireAuthStub = {
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
