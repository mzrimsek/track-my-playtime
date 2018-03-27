import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import authComponentSelectors, { State } from '../reducers/root.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(authComponentSelectors.isUserLoggedIn),
      map(authed => {
        if (!authed) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
