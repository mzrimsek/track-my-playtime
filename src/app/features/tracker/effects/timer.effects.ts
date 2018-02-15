import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as timerActions from '../actions/timer';
import * as historyActions from '../actions/history';
import { TimerInfo, HistoryListItem } from '../models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TimerEffects {

  constructor(private actions$: Actions) { }

  @Effect() resetTimer$ =
    this.actions$
      .ofType(timerActions.TIMER_STOP)
      .mergeMap(action => [
        // TODO: save action in db - probably need to add the history item if save is successful
        new historyActions.AddNewHistoryItem(<HistoryListItem>{
          id: '1',
          game: <string>action['timerInfo'].game,
          platform: <string>action['timerInfo'].platform,
          startDate: <Date>action['timerInfo'].startDate,
          endDate: <Date>action['endTime']
        }),
        new timerActions.ResetTimer()
      ]);
}
