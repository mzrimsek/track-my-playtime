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

export const CLEAR_PROFILE = '[Profile] Clear Profile';
export class ClearProfile implements Action {
  readonly type = CLEAR_PROFILE;
  constructor() { }
}

export type All = LoadProfile |
  LoadProfileSucceeded |
  ClearProfile;
