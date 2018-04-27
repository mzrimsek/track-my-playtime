import { TestBed } from '@angular/core/testing';

import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';

describe('Auth Service', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;
  let isAuth$: Subscription;
  let isAuthRef: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthStub }
      ]
    });

    service = TestBed.get(AuthService);
    afAuth = TestBed.get(AngularFireAuth);

    isAuth$ = service.getAuthState()
      .map(user => user !== null)
      .subscribe(isAuth => isAuthRef = isAuth);
  });

  afterEach(() => {
    fakeAuthState.next(null);
    isAuth$.unsubscribe();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAuthState', () => {
    it('Should return null when not authenticated', () => {
      fail();
    });

    it('Should return user info when authenticated ', () => {
      fail();
    });
  });

  describe('signInWithGoogle', () => {
    it('Should call AngularFireAuth signInWithPopup', () => {
      fail();
    });
  });

  describe('signOut', () => {
    it('Should call AngularFireAuth signOut', () => {
      fail();
    });
  });
});

const mockUser = {
  uid: 'some id',
  displayName: 'Jim Bob',
  email: 'jimbob@jimbob.com',
  photoURL: 'jimbob.com/jimbob.png'
};

const fakeAuthState = new BehaviorSubject(null);

const fakeSignInHandler = (_provider: any): Promise<any> => {
  fakeAuthState.next(mockUser);
  return Promise.resolve(mockUser);
};

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

const angularFireAuthStub = {
  authState: fakeAuthState,
  signInWithPopup: () => { },
  signOut: () => { }
};
