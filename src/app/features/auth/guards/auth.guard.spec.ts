import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { cold } from 'jasmine-marbles';

import { AuthGuard } from './auth.guard';

import * as actions from '../actions/user.actions';

import * as fromRoot from '../../../reducers/root.reducer';
import * as fromAuth from '../reducers/root.reducer';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store<fromAuth.State>;
  let route = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString']);
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
        { provide: ActivatedRouteSnapshot, useValue: route }
      ],
    }).compileComponents();

    guard = TestBed.get(AuthGuard);
    store = TestBed.get(Store);
    route = TestBed.get(ActivatedRouteSnapshot);
    router = TestBed.get(Router);
  });

  it('Should return false when user not authenticated', () => {
    store.dispatch(new actions.NotAuthenticated());
    const expected = cold('(a|)', { a: false });

    const routerState: RouterStateSnapshot = {
      root: route,
      url: ''
    };

    const result = guard.canActivate(route, routerState);

    expect(result).toBeObservable(expected);
  });

  it('Should navigate to login when user is not authenticated', () => {
    store.dispatch(new actions.NotAuthenticated());
    const routerState: RouterStateSnapshot = {
      root: route,
      url: ''
    };

    guard.canActivate(route, routerState);

    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '' } });
  });

  it('Should navigate to login with correct returnUrl when user is not authenticated from protected route', () => {
    store.dispatch(new actions.NotAuthenticated());
    route.url = 'app';
    const routerState: RouterStateSnapshot = {
      root: route,
      url: ''
    };

    guard.canActivate(route, routerState);

    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: 'app' } });
  });

  it('Should return true when user is authenticated', () => {

    store.dispatch(new actions.Authenticated({
      uid: 'some id',
      displayName: 'Jim Bob',
      email: 'jimbob@jimbob.com',
      photoURL: 'jimbob.com/jimbob.png'
    }));
    const expected = cold('(a|)', { a: true });
    const routerState: RouterStateSnapshot = {
      root: route,
      url: ''
    };

    const result = guard.canActivate(route, routerState);

    expect(result).toBeObservable(expected);
  });
});
