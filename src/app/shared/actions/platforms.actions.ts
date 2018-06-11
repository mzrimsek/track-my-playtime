import { Action } from '@ngrx/store';

export const LOAD_OPTIONS = '[Platforms] Load Options';
export class LoadOptions implements Action {
  readonly type = LOAD_OPTIONS;
  constructor() { }
}

export const LOAD_OPTIONS_SUCCEEDED = '[Platforms] Load Options Succeeded';
export class LoadOptionsSucceeded implements Action {
  readonly type = LOAD_OPTIONS_SUCCEEDED;
  constructor(public platforms: string[]) { }
}

export type All = LoadOptions |
  LoadOptionsSucceeded;
