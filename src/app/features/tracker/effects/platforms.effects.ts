import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as appActions from '../../../actions/app.actions';
import { PlatformsService } from '../services/platforms.service';
import * as platformsActions from '../actions/platforms.actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlatformsEffects {

  constructor(private actions$: Actions, private platformsService: PlatformsService) { }

  @Effect() loadOptions$ =
    this.actions$
      .ofType(platformsActions.LOAD_OPTIONS)
      .switchMap(() => this.platformsService.getPlatformsOptions()
        .map(data => {
          return new platformsActions.LoadOptionsSucceeded(data);
        })
        .catch(err =>
          Observable.of(new appActions.Error(err.message))
        )
      );
}
