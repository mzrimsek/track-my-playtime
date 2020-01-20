import { Action } from '@ngrx/store';

import { Profile } from 'features/profile/models';

export const LOAD_PROFILE = '[Profile] Load Profile';
export class LoadProfile implements Action {
  readonly type = LOAD_PROFILE;
  constructor(public userId: string) { }
}

export const LOAD_PROFILE_SUCCEEDED = '[Profile] Load Profile Succeeded';
export class LoadProfileSucceeded implements Action {
  readonly type = LOAD_PROFILE_SUCCEEDED;
  constructor(public profile: Profile) { }
}

export const SET_PROFILE_DISPLAYNAME = '[Profile] Set DisplayName';
export class SetProfileDisplayName implements Action {
  readonly type = SET_PROFILE_DISPLAYNAME;
  constructor(public userId: string, public displayName: string) { }
}

export const SET_PROFILE_DISPLAYNAME_SUCCEEDED = '[Profile] Set DisplayName Succeeded';
export class SetProfileDisplayNameSucceeded implements Action {
  readonly type = SET_PROFILE_DISPLAYNAME_SUCCEEDED;
  constructor(public displayName: string) { }
}

export type All = LoadProfile |
  LoadProfileSucceeded |
  SetProfileDisplayName |
  SetProfileDisplayNameSucceeded;
