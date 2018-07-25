import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { UserEffects } from './user.effects';

import { AuthService } from '../services/auth.service';

import * as appActions from '../../../actions/app.actions';
import * as userActions from '../actions/user.actions';

import { auth, routing, user } from '../../../test-helpers';

describe('User Effects', () => {
  let actions: any;
  let effects: UserEffects;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  let authService: AuthService;

  const initTests = () => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useClass: auth.MockAuthService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: routing.mockActivatedRoute }
      ]
    });

    effects = TestBed.get(UserEffects);
    authService = TestBed.get(AuthService);
  };

  describe('Inject', () => {
    beforeEach(() => {
      initTests();
    });

    it('Should be created', () => {
      expect(effects).toBeTruthy();
    });
  });

  describe('Get User', () => {
    describe('Authenticated User', () => {
      describe('Without return url', () => {
        beforeEach(() => {
          initTests();
          authService.signInWithGoogle();
        });

        it('Should dispatch Authenticated', () => {
          actions = hot('-a', { a: new userActions.GetUser() });
          const expected = cold('-(b)', {
            b: new userActions.Authenticated(user.mockUser)
          });
          expect(effects.getUser$).toBeObservable(expected);
        });

        it('Should navigate to "app"', () => {
          actions = new ReplaySubject(1);
          actions.next(new userActions.GetUser());

          effects.getUser$.subscribe(() => {
            expect(router.navigate).toHaveBeenCalledWith(['app']);
          });
        });
      });

      describe('With return url', () => {
        const returnUrl = 'some/route';

        beforeEach(() => {
          routing.mockActivatedRoute.snapshot.queryParams.returnUrl = returnUrl;
          initTests();
          authService.signInWithGoogle();
        });

        it('Should dispatch Authenticated', () => {
          actions = hot('-a', { a: new userActions.GetUser() });
          const expected = cold('-(b)', {
            b: new userActions.Authenticated(user.mockUser)
          });
          expect(effects.getUser$).toBeObservable(expected);
        });

        it('Should navigate to return url', () => {
          actions = new ReplaySubject(1);
          actions.next(new userActions.GetUser());

          effects.getUser$.subscribe(() => {
            expect(router.navigate).toHaveBeenCalledWith([returnUrl]);
          });
        });
      });
    });

    describe('Not Authenticated User', () => {
      beforeEach(() => {
        initTests();
        authService.signOut();
      });

      it('Should dispatch NotAuthenticated', () => {
        actions = hot('-a', { a: new userActions.GetUser() });
        const expected = cold('-(b)', {
          b: new userActions.NotAuthenticated()
        });
        expect(effects.getUser$).toBeObservable(expected);
      });
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';
      actions = hot('-a', { a: new userActions.GetUser() });

      const expected = cold('-(b)', {
        b: new appActions.Error(userActions.GET_USER, message)
      });

      spyOn(authService, 'getAuthState').and.callFake(() => Observable.throw({ message }));
      expect(effects.getUser$).toBeObservable(expected);
    });

    it('Should call AuthService getAuthState', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.GetUser());

      spyOn(authService, 'getAuthState').and.callThrough();
      effects.getUser$.subscribe(() => {
        expect(authService.getAuthState).toHaveBeenCalled();
      });
    });
  });

  describe('Google Login', () => {
    beforeEach(() => {
      initTests();
    });

    it('Should dispatch GetUser', () => {
      actions = hot('-a', { a: new userActions.GoogleLogin() });
      const expected = cold('-(b)', {
        b: new userActions.GetUser()
      });
      expect(effects.googleLogin$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';
      actions = hot('-a', { a: new userActions.GoogleLogin() });

      const expected = cold('-(b)', {
        b: new appActions.Error(userActions.GOOGLE_LOGIN, message)
      });

      spyOn(authService, 'signInWithGoogle').and.callFake(() => Observable.throw({ message }));
      expect(effects.googleLogin$).toBeObservable(expected);
    });

    it('Should call AuthService signInWithGoogle', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.GoogleLogin());

      spyOn(authService, 'signInWithGoogle').and.callThrough();
      effects.googleLogin$.subscribe(() => {
        expect(authService.signInWithGoogle).toHaveBeenCalled();
      });
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      initTests();
    });

    it('Should dispatch NotAuthenticated', () => {
      actions = hot('-a', { a: new userActions.Logout() });
      const expected = cold('-(b)', {
        b: new userActions.NotAuthenticated()
      });

      expect(effects.logout$).toBeObservable(expected);
    });

    it('Should navigate to login', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.Logout());

      effects.logout$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['login']);
      });
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';
      actions = hot('-a', { a: new userActions.Logout() });

      const expected = cold('-(b)', {
        b: new appActions.Error(userActions.LOGOUT, message)
      });

      spyOn(authService, 'signOut').and.callFake(() => Observable.throw({ message }));
      expect(effects.logout$).toBeObservable(expected);
    });

    it('Should call AuthService signOut', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.Logout());

      spyOn(authService, 'signOut').and.callThrough();
      effects.logout$.subscribe(() => {
        expect(authService.signOut).toHaveBeenCalled();
      });
    });
  });

  describe('Sign Up', () => {
    beforeEach(() => {
      initTests();
    });

    it('Should dispatch GetUser', () => {
      actions = hot('-a', { a: new userActions.SignUp('email', 'password') });
      const expected = cold('-(b)', {
        b: new userActions.GetUser()
      });
      expect(effects.signUp$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';
      actions = hot('-a', { a: new userActions.SignUp('email', 'password') });

      const expected = cold('-(b)', {
        b: new appActions.Error(userActions.SIGNUP, message)
      });

      spyOn(authService, 'signUpWithEmail').and.callFake(() => Observable.throw({ message }));
      expect(effects.signUp$).toBeObservable(expected);
    });

    it('Should call AuthService signUpWithEmail', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.SignUp('email', 'password'));

      spyOn(authService, 'signUpWithEmail').and.callThrough();
      effects.signUp$.subscribe(() => {
        expect(authService.signUpWithEmail).toHaveBeenCalledWith('email', 'password');
      });
    });
  });

  describe('Email Login', () => {
    beforeEach(() => {
      initTests();
    });

    it('Should dispatch GetUser', () => {
      actions = hot('-a', { a: new userActions.EmailLogin('email', 'password') });
      const expected = cold('-(b)', {
        b: new userActions.GetUser()
      });
      expect(effects.emailLogin$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';
      actions = hot('-a', { a: new userActions.EmailLogin('email', 'password') });

      const expected = cold('-(b)', {
        b: new appActions.Error(userActions.EMAIL_LOGIN, message)
      });

      spyOn(authService, 'signInWithEmail').and.callFake(() => Observable.throw({ message }));
      expect(effects.emailLogin$).toBeObservable(expected);
    });

    it('Should call AuthService signInWithEmail', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.EmailLogin('email', 'password'));

      spyOn(authService, 'signInWithEmail').and.callThrough();
      effects.emailLogin$.subscribe(() => {
        expect(authService.signInWithEmail).toHaveBeenCalledWith('email', 'password');
      });
    });
  });
});
