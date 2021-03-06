import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { map, mergeMap } from 'rxjs/operators';

import * as historyActions from '../../../shared/actions/history.actions';
import * as platformsActions from '../../../shared/actions/platforms.actions';
import * as progressActions from '../../../shared/actions/progress.actions';
import * as timerActions from '../../../shared/actions/timer.actions';
import * as userActions from '../../auth/actions/user.actions';
import * as profileActions from '../../profile/actions/profile.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions) { }

  @Effect() authenticated$ =
    this.actions$
      .ofType(userActions.AUTHENTICATED)
      .pipe(
        map(action => action as userActions.Authenticated),
        mergeMap(action => [
          new platformsActions.LoadOptions(),
          new historyActions.LoadHistoryItems(action.user.uid),
          new timerActions.LoadTimerInfo(action.user.uid),
          new progressActions.LoadProgressItems(action.user.uid),
          new profileActions.LoadProfile(action.user.uid)
        ])
      );
}
