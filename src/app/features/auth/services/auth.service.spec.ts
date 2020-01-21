import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth, user } from 'app/test-helpers';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

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
        .pipe(map(firebaseUser => firebaseUser !== null))
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

  describe('signInWithFacebook', () => {
    it('Should call AngularFireAuth signInWithPopup', () => {
      service.signInWithFacebook();
      expect(afAuth.auth.signInWithPopup).toHaveBeenCalled();
    });
  });

  describe('signInWithTwitter', () => {
    it('Should call AngularFireAuth signInWithPopup', () => {
      service.signInWithTwitter();
      expect(afAuth.auth.signInWithPopup).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('Should call AngularFireAuth signOut', () => {
      service.signOut();
      expect(afAuth.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('signUpWithEmail', () => {
    it('Should call AngularFireAuth createUserWithEmailAndPassword', () => {
      const password = 'password';
      service.signUpWithEmail(user.mockUser.email, password);
      expect(afAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(user.mockUser.email, password);
    });
  });

  describe('signInWithEmail', () => {
    it('Should call AngularFireAuth signInWithEmailAndPassword', () => {
      const password = 'password';
      service.signInWithEmail(user.mockUser.email, password);
      expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(user.mockUser.email, password);
    });
  });

  describe('resetPassword', () => {
    it('Should call AngularFireAuth sendPasswordResetEmail', () => {
      service.resetPassword(user.mockUser.email);
      expect(afAuth.auth.sendPasswordResetEmail).toHaveBeenCalledWith(user.mockUser.email);
    });
  });
});
