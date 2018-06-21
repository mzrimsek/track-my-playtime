import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import * as timerActions from '../../../features/tracker/actions/timer.actions';
import * as historyActions from '../../../shared/actions/history.actions';
import * as platformsActions from '../../../shared/actions/platforms.actions';
import * as userActions from '../../auth/actions/user.actions';
import * as addPlayingActions from '../../completion/actions/add-playing.actions';
import * as markCompleteActions from '../../completion/actions/mark-complete.actions';
import * as progressActions from '../../completion/actions/progress.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions) { }

  @Effect() authenticated$ =
    this.actions$
      .ofType(userActions.AUTHENTICATED)
      .map(action => action as userActions.Authenticated)
      .mergeMap(action => [
        new platformsActions.LoadOptions(),
        new historyActions.LoadHistoryItems(action.user.uid),
        new timerActions.LoadTimerInfo(action.user.uid),
        new progressActions.LoadProgressItems(action.user.uid)
      ]);

  @Effect() logout$ =
    this.actions$
      .ofType(userActions.LOGOUT)
      .mergeMap(() => [
        new historyActions.ClearHistoryItems(),
        new timerActions.ResetTimer(),
        new progressActions.ClearProgressItems(),
        new addPlayingActions.Reset(),
        new markCompleteActions.ClearItems()
      ]);
}
