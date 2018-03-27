import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { PlatformsService } from '../services/platforms.service';

import * as appActions from '../../../actions/app.actions';
import * as platformsActions from '../actions/platforms.actions';

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
          Observable.of(new appActions.Error(platformsActions.LOAD_OPTIONS, err.message))
        )
      );
}
