import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import authComponentSelectors, { State } from '../reducers/root.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(authComponentSelectors.isUserLoggedIn),
      map(authed => {
        if (!authed) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
