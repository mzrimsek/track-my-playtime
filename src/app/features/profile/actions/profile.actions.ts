import { Action } from '@ngrx/store';

import { Profile } from '../models';

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

export type All = LoadProfile | LoadProfileSucceeded;
