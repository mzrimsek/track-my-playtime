import { Action } from '@ngrx/store';

export const APP_INIT = '[App] Initialize';
export class InitializeApplication implements Action {
  readonly type = APP_INIT;
  constructor() { }
}

export type All = InitializeApplication;
