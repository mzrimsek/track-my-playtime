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
  let routeSnapshot: RouterStateSnapshot = jasmine.createSpyObj('RouteStateSnapshot', ['toString']);
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
        { provide: RouterStateSnapshot, useValue: routeSnapshot }
      ],
    }).compileComponents();

    guard = TestBed.get(AuthGuard);
    store = TestBed.get(Store);
    routeSnapshot = TestBed.get(RouterStateSnapshot);
    router = TestBed.get(Router);
  });

  it('Should return false when user not authenticated', () => {
    store.dispatch(new actions.NotAuthenticated());
    const expected = cold('(a|)', { a: false });

    const result = guard.canActivate(new ActivatedRouteSnapshot(), routeSnapshot);

    expect(result).toBeObservable(expected);
  });

  xit('Should navigate user to login with return url param when user not authenticated', () => {
    store.dispatch(new actions.NotAuthenticated());
    routeSnapshot.url = '/protected';

    guard.canActivate(new ActivatedRouteSnapshot(), routeSnapshot);

    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '/protected ' } });
  });

  it('Should return true when user is authenticated', () => {

    store.dispatch(new actions.Authenticated({
      uid: 'some id',
      displayName: 'Jim Bob',
      email: 'jimbob@jimbob.com',
      photoURL: 'jimbob.com/jimbob.png'
    }));
    const expected = cold('(a|)', { a: true });

    const result = guard.canActivate(new ActivatedRouteSnapshot(), routeSnapshot);

    expect(result).toBeObservable(expected);
  });
});
