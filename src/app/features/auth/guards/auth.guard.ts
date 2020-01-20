import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import authComponentSelectors, { State } from 'features/auth/reducers/root.reducer';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(authComponentSelectors.isUserLoggedIn)
      .pipe(
        map(authed => {
          if (!authed) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          }
          return true;
        }),
        take(1));
  }
}
