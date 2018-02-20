import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TimerService } from '../services/timer.service';
import * as appActions from '../../../actions';
import * as timerActions from '../actions/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TrackerInitializationEffects {

  constructor(private actions$: Actions, private timerService: TimerService) { }

  @Effect() initialize$ =
    this.actions$
      .ofType(appActions.APP_INIT)
      .mergeMap(_ => [
        new timerActions.LoadPlatforms()
      ]);

  @Effect() loadPlatforms$ =
    this.actions$
      .ofType(timerActions.LOAD_PLATFORMS)
      .switchMap(() => this.timerService.getPlatforms()
        .map(data => {
          return new timerActions.LoadPlatformsSucceeded(data);
        }));
}
