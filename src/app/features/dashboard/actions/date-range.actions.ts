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

export const SET_THIS_WEEK = '[Dashboard] Set This Week';
export class SetThisWeek implements Action {
  readonly type = SET_THIS_WEEK;
  constructor() { }
}

export const SET_LAST_WEEK = '[Dashboard] Set Last Week';
export class SetLastWeek implements Action {
  readonly type = SET_LAST_WEEK;
  constructor() { }
}

export const SET_THIS_MONTH = '[Dashboard] Set This Month';
export class SetThisMonth implements Action {
  readonly type = SET_THIS_MONTH;
  constructor() { }
}

export type All = SetStartDay |
  SetEndDay |
  SetThisWeek |
  SetLastWeek |
  SetThisMonth;
