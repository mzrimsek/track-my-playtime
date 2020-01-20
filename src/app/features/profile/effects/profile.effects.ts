import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import * as appActions from 'app/actions/app.actions';
import * as profileActions from 'features/profile/actions/profile.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ProfileService } from 'features/profile/services/profile.service';

@Injectable()
export class ProfileEffects {

  constructor(private actions$: Actions, private profileService: ProfileService) { }

  @Effect() loadProfile$ =
    this.actions$
      .ofType(profileActions.LOAD_PROFILE)
      .pipe(
        map(action => action as profileActions.LoadProfile),
        switchMap(action => this.profileService.getProfile(action.userId)
          .pipe(
            map(data => new profileActions.LoadProfileSucceeded(data)),
            catchError(err => of(new appActions.Error(profileActions.LOAD_PROFILE, err.message))))));

  @Effect() setDisplayName$ =
    this.actions$
      .ofType(profileActions.SET_PROFILE_DISPLAYNAME)
      .pipe(
        map(action => action as profileActions.SetProfileDisplayName),
        switchMap(action => this.profileService.setDisplayName(action.userId, action.displayName)
          .pipe(
            map(data => new profileActions.SetProfileDisplayNameSucceeded(data)),
            catchError(err => of(new appActions.Error(profileActions.SET_PROFILE_DISPLAYNAME, err.message))))));
}
