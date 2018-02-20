import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TimerService } from '../services/timer.service';
import { AddTimerInfo } from '../models';
import * as timerActions from '../actions/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TimerEffects {

  constructor(private actions$: Actions, private timerService: TimerService) { }

  @Effect() saveTimerInfo$ =
    this.actions$
      .ofType(timerActions.SAVE_TIMER_INFO)
      .map(action => <AddTimerInfo>{
        game: <string>action['info'].game,
        platform: <string>action['info'].platform,
        startDate: <Date>action['info'].startDate,
        endDate: <Date>action['endTime']
      })
      .switchMap(addTimerInfo => this.timerService.saveTimerInfo(addTimerInfo))
      .mergeMap(item => [
        new timerActions.SaveTimerInfoSucceeded(item),
        new timerActions.ResetTimer()
      ]);
}

