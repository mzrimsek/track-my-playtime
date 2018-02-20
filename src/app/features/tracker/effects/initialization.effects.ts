import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TimerService } from '../services/timer.service';
import { HistoryService } from '../services/history.service';
import * as appActions from '../../../actions';
import * as timerActions from '../actions/timer';
import * as historyActions from '../actions/history';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TrackerInitializationEffects {

  constructor(private actions$: Actions, private timerService: TimerService, private historyService: HistoryService) { }

  @Effect() initialize$ =
    this.actions$
      .ofType(appActions.APP_INIT)
      .mergeMap(() => [
        new timerActions.LoadPlatforms(),
        new historyActions.LoadHistoryItems()
      ]);

  @Effect() loadPlatforms$ =
    this.actions$
      .ofType(timerActions.LOAD_PLATFORMS)
      .switchMap(() => this.timerService.getPlatforms()
        .map(data => {
          return new timerActions.LoadPlatformsSucceeded(data);
        }));

  @Effect() loadHistoryItems$ =
    this.actions$
      .ofType(historyActions.LOAD_HISTORY_ITEMS)
      .switchMap(() => this.historyService.getHistoryList()
        .map(data => {
          return new historyActions.LoadHistoryItemsSucceeded(data);
        }));
}
