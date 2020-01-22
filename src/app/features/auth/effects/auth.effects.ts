import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import * as userActions from 'features/auth/actions/user.actions';
import * as profileActions from 'features/profile/actions/profile.actions';
import { map, mergeMap } from 'rxjs/operators';
import * as historyActions from 'shared/actions/history.actions';
import * as platformsActions from 'shared/actions/platforms.actions';
import * as progressActions from 'shared/actions/progress.actions';
import * as timerActions from 'shared/actions/timer.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions) { }

  @Effect() authenticated$ =
    this.actions$
      .pipe(
        ofType(userActions.AUTHENTICATED),
        map(action => action as userActions.Authenticated),
        mergeMap(action => [
          new platformsActions.LoadOptions(),
          new historyActions.LoadHistoryItems(action.user.uid),
          new timerActions.LoadTimerInfo(action.user.uid),
          new progressActions.LoadProgressItems(action.user.uid),
          new profileActions.LoadProfile(action.user.uid)
        ]));
}
