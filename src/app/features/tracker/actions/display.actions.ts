import { Action } from '@ngrx/store';

export const INCREMENT_DAYS_TO_SHOW = '[Display] Increment Days to Show';
export class IncrementDaysToShow implements Action {
  readonly type = INCREMENT_DAYS_TO_SHOW;
  constructor(public amount: number) { }
}

export type All = IncrementDaysToShow;
