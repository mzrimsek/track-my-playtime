import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import * as appActions from '../../../actions';
import * as timerActions from '../actions/timer';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TrackerInitializationEffects {

  private platformsUrl = environment.platformsUrl;
  constructor(private actions$: Actions, private http: HttpClient) { }

  @Effect() initialize$ =
    this.actions$
      .ofType(appActions.APP_INIT)
      .mergeMap(_ => [
        new timerActions.LoadPlatforms()
      ]);

  @Effect() loadPlatforms$ =
    this.actions$
      .ofType(timerActions.LOAD_PLATFORMS)
      .switchMap(() => this.http.get<PlatformsResponse>(this.platformsUrl)
        .map(res => res._data)
        .map(data => {
          return new timerActions.LoadPlatformsSucceeded(data);
        }));
}

interface PlatformsResponse {
  _data: string[];
}
