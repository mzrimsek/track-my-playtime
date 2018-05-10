import { Action } from '@ngrx/store';

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

export const SET_LAST_MONTH = '[Dashboard] Set Last Month';
export class SetLastMonth implements Action {
  readonly type = SET_LAST_MONTH;
  constructor() { }
}

export type All = SetThisWeek |
  SetLastWeek |
  SetThisMonth |
  SetLastMonth;
