import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as timerActions from '../actions/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TimerEffects {

  constructor(private actions$: Actions) { }

  @Effect() resetTimer$ =
    this.actions$
      .ofType(timerActions.TIMER_STOP)
      .mergeMap(action => [
        new timerActions.ResetTimer()
      ]);
}
