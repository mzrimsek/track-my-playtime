import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import * as timerActions from '../actions/timer';
import { HistoryListItem } from '../models';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TimerEffects {

  constructor(private actions$: Actions, private http: HttpClient) { }

  @Effect() saveTimerInfo$ =
    this.actions$
      .ofType(timerActions.SAVE_TIMER_INFO)
      .map(action => <AddTimerInfo>{
        game: <string>action['info'].game,
        platform: <string>action['info'].platform,
        startDate: <Date>action['info'].startDate,
        endDate: <Date>action['endTime']
      })
      .switchMap(addTimerInfo => this.http.post<HistoryItemResponse>(environment.urls.saveTimerInfo, addTimerInfo))
      .map(res => res._data)
      .mergeMap(item => [
        new timerActions.SaveTimerInfoSucceeded(item),
        new timerActions.ResetTimer()
      ]);
}

interface AddTimerInfo {
  game: string;
  platform: string;
  startDate: Date;
  endDate: Date;
}

interface HistoryItemResponse {
  _data: HistoryListItem;
}
