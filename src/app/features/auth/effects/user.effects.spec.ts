import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { User as AuthUser } from '@firebase/auth-types';
import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { UserEffects } from './user.effects';

import { AuthService } from '../services/auth.service';

import * as appActions from '../../../actions/app.actions';
import * as userActions from '../actions/user.actions';

describe('User Effects', () => {
  let actions: any;
  let effects: UserEffects;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    effects = TestBed.get(UserEffects);
    authService = TestBed.get(AuthService);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Get User', () => {
    describe('Authenticated User', () => {
      it('Should dispatch Authenticated', () => {
        actions = hot('-a', { a: new userActions.GetUser() });

        const expected = cold('-(b)', {
          b: new userActions.Authenticated(mockUser)
        });

        authService.signInWithGoogle();
        expect(effects.getUser$).toBeObservable(expected);
      });

      describe('Without return url', () => {
        it('Should navigate to "app"', () => {
          actions = new ReplaySubject(1);
          actions.next(new userActions.GetUser());

          effects.getUser$.subscribe(() => {
            expect(router.navigate).toHaveBeenCalledWith(['app']);
          });
        });
      });

      describe('With return url', () => {
        it('Should navigate to return url', () => {
          const returnUrl = 'some/route';
          mockActivatedRoute.snapshot.queryParams.returnUrl = returnUrl;

          actions = new ReplaySubject(1);
          actions.next(new userActions.GetUser());

          effects.getUser$.subscribe(() => {
            expect(router.navigate).toHaveBeenCalledWith([returnUrl]);
          });
        });
      });
    });

    describe('Not Authenticated User', () => {
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

    it('Should call UserService getAuthState', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.GetUser());

      spyOn(authService, 'getAuthState').and.callThrough();
      effects.getUser$.subscribe(() => {
        expect(authService.getAuthState).toHaveBeenCalled();
      });
    });
  });

  describe('Google Login', () => {
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

    it('Should call UserService signInWithGoogle', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.GoogleLogin());

      spyOn(authService, 'signInWithGoogle').and.callThrough();
      effects.googleLogin$.subscribe(() => {
        expect(authService.signInWithGoogle).toHaveBeenCalled();
      });
    });
  });

  describe('Logout', () => {
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

    it('Should call UserService signOut', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.Logout());

      spyOn(authService, 'signOut').and.callThrough();
      effects.logout$.subscribe(() => {
        expect(authService.signOut).toHaveBeenCalled();
      });
    });
  });
});

const mockActivatedRoute = {
  snapshot: {
    queryParams: {
      returnUrl: ''
    }
  }
};

const mockUser = {
  uid: 'some id',
  displayName: 'Jim Bob',
  email: 'jimbob@jimbob.com',
  photoURL: 'jimbob.com/jimbob.png'
};

class MockAuthService {
  private authState: Observable<any>;

  constructor() {
    this.authState = Observable.of(null);
  }

  getAuthState(): Observable<AuthUser | null> {
    return this.authState;
  }

  signInWithGoogle(): Observable<any> {
    this.authState = Observable.of(mockUser);
    return Observable.of('Logged in with Google');
  }

  signOut(): Observable<any> {
    this.authState = Observable.of(null);
    return Observable.of('Logged out');
  }
}
