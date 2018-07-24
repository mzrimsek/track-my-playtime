import { TestBed } from '@angular/core/testing';

import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';

import { auth } from '../../../testing/testing-helpers';

describe('Auth Service', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: auth.angularFireAuthStub }
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
        .map(firebaseUser => firebaseUser !== null)
        .subscribe(isAuth => isAuthRef = isAuth);
    });

    afterEach(() => {
      auth.fakeAuthState.next(null);
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
