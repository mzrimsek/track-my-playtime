import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { ProfileService } from '../services/profile.service';

import * as appActions from '../../../actions/app.actions';
import * as profileActions from '../actions/profile.actions';

@Injectable()
export class ProfileEffects {

  constructor(private actions$: Actions, private profileService: ProfileService) { }

  @Effect() loadProfile$ =
    this.actions$
      .ofType(profileActions.LOAD_PROFILE)
      .map(action => action as profileActions.LoadProfile)
      .switchMap(action => this.profileService.getProfile(action.userId)
        .map(data => new profileActions.LoadProfileSucceeded(data))
        .catch(err => Observable.of(new appActions.Error(profileActions.LOAD_PROFILE, err.message))));
}