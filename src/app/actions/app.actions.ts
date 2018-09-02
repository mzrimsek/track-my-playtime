import { Action } from '@ngrx/store';

export const APP_ERROR = '[App] Error';
export class Error implements Action {
  readonly type = APP_ERROR;
  constructor(public action: string, public message: string) { }
}

export type All = Error;
