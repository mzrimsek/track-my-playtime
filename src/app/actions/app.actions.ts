import { Action } from '@ngrx/store';

export const APP_INIT = '[App] Initialize';
export class InitializeApplication implements Action {
  readonly type = APP_INIT;
  constructor() { }
}

export const APP_ERROR = '[App] Error';
export class Error implements Action {
  readonly type = APP_ERROR;
  constructor(public message: string) { }
}

export type All = InitializeApplication
  | Error;
