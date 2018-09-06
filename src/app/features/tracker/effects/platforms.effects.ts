import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PlatformsService } from '../services/platforms.service';

import * as appActions from '../../../actions/app.actions';
import * as platformsActions from '../../../shared/actions/platforms.actions';

@Injectable()
export class PlatformsEffects {

  constructor(private actions$: Actions, private platformsService: PlatformsService) { }

  @Effect() loadOptions$ =
    this.actions$
      .ofType(platformsActions.LOAD_OPTIONS)
      .pipe(
        switchMap(() => this.platformsService.getPlatformsOptions()
          .pipe(
            map(data => new platformsActions.LoadOptionsSucceeded(data)),
            catchError(err => of(new appActions.Error(platformsActions.LOAD_OPTIONS, err.message))))));
}
