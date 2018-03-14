import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PlatformsService } from '../services/platforms.service';
import * as platformsActions from '../actions/platforms.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class PlatformsEffects {

  constructor(private actions$: Actions, private platformsService: PlatformsService) { }

  @Effect() loadOptions$ =
    this.actions$
      .ofType(platformsActions.LOAD_OPTIONS)
      .switchMap(() => this.platformsService.getPlatformsOptions()
        .map(data => {
          return new platformsActions.LoadOptionsSucceeded(data);
        }));
}

