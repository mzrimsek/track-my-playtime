import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { routing, user } from 'app/test-helpers';
import { cold } from 'jasmine-marbles';

import { AuthGuard } from './auth.guard';

import * as actions from 'features/auth/actions/user.actions';

import * as fromRoot from 'app/reducers/root.reducer';
import * as fromAuth from 'features/auth/reducers/root.reducer';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store<fromAuth.State>;
  let routerStateSnapshot: RouterStateSnapshot;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers)
        })
      ],
      providers: [
        AuthGuard,
        { provide: Router, useValue: router },
        { provide: RouterStateSnapshot, useClass: routing.MockRouterStateSnapshot }
      ],
    }).compileComponents();

    guard = TestBed.get(AuthGuard);
    store = TestBed.get(Store);

    routerStateSnapshot = TestBed.get(RouterStateSnapshot);
    router = TestBed.get(Router);
  });

  it('Should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('Should return false when user not authenticated', () => {
    store.dispatch(new actions.NotAuthenticated());
    const expected = cold('(a|)', { a: false });

    const result = guard.canActivate(new ActivatedRouteSnapshot(), routerStateSnapshot);

    expect(result).toBeObservable(expected);
  });

  it('Should navigate user to login with return url when user not authenticated', () => {
    store.dispatch(new actions.NotAuthenticated());
    guard.canActivate(new ActivatedRouteSnapshot(), routerStateSnapshot);
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: routerStateSnapshot.url } });
  });

  it('Should return true when user is authenticated', () => {
    store.dispatch(new actions.Authenticated(user.mockUser));
    const expected = cold('(a|)', { a: true });

    const result = guard.canActivate(new ActivatedRouteSnapshot(), routerStateSnapshot);

    expect(result).toBeObservable(expected);
  });
});
