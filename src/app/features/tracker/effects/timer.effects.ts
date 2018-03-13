import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TimerService } from '../services/timer.service';
import * as timerActions from '../actions/timer.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TimerEffects {

  constructor(private actions$: Actions, private timerService: TimerService) { }

  @Effect() loadPlatforms$ =
    this.actions$
      .ofType(timerActions.LOAD_PLATFORMS)
      .switchMap(() => this.timerService.getPlatforms()
        .map(data => {
          return new timerActions.LoadPlatformsSucceeded(data);
        }));

  @Effect() saveTimerInfo$ =
    this.actions$
      .ofType(timerActions.SAVE_TIMER_INFO)
      .map(action => action as timerActions.SaveTimerInfo)
      .map(action => action.info)
      .switchMap(addTimerInfo => this.timerService.saveTimerInfo(addTimerInfo))
      .mergeMap(item => [
        new timerActions.SaveTimerInfoSucceeded(item),
        new timerActions.ResetTimer()
      ]);

  @Effect() cancelTimer$ =
    this.actions$
      .ofType(timerActions.CANCEL_TIMER)
      .mergeMap(() => [
        new timerActions.ResetTimer()
      ]);
}

