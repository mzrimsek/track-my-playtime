import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { cold } from 'jasmine-marbles';

import { AuthGuard } from './auth.guard';

import * as actions from '../actions/user.actions';

import * as fromRoot from '../../../reducers/root.reducer';
import * as fromAuth from '../reducers/root.reducer';

import { routing, user } from '../../../test-helpers';

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

    spyOn(store, 'select').and.callThrough();

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

  it('Should select user logged in', () => {
    guard.canActivate(new ActivatedRouteSnapshot(), routerStateSnapshot);
    expect(store.select).toHaveBeenCalledWith(fromAuth._selectUserLoggedIn);
  });
});
