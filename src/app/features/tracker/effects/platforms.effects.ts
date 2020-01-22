import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import * as appActions from 'app/actions/app.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as platformsActions from 'shared/actions/platforms.actions';

import { PlatformsService } from 'features/tracker/services/platforms.service';

@Injectable()
export class PlatformsEffects {

  constructor(private actions$: Actions, private platformsService: PlatformsService) { }

  @Effect() loadOptions$ =
    this.actions$
      .pipe(
        ofType(platformsActions.LOAD_OPTIONS),
        switchMap(() => this.platformsService.getPlatformsOptions()
          .pipe(
            map(data => new platformsActions.LoadOptionsSucceeded(data)),
            catchError(err => of(new appActions.Error(platformsActions.LOAD_OPTIONS, err.message))))));
}
