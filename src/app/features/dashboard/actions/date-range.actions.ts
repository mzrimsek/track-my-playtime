import { Action } from '@ngrx/store';

export const SET_START_DAY = '[Dashboard] Set Start Day';
export class SetStartDay implements Action {
  readonly type = SET_START_DAY;
  constructor(public start: string) { }
}

export const SET_END_DAY = '[Dashboard] Set End Day';
export class SetEndDay implements Action {
  readonly type = SET_END_DAY;
  constructor(public end: string) { }
}

export type All = SetStartDay |
  SetEndDay;
