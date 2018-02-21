import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as appActions from '../../../actions';
import * as timerActions from '../actions/timer';
import * as historyActions from '../actions/history';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TrackerInitializationEffects {

  constructor(private actions$: Actions) { }

  @Effect() initialize$ =
    this.actions$
      .ofType(appActions.APP_INIT)
      .mergeMap(() => [
        new timerActions.LoadPlatforms(),
        new historyActions.LoadHistoryItems()
      ]);




}
