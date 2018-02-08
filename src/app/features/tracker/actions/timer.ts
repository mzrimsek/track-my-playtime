import { Action } from '@ngrx/store';

export const TIMER_START = '[Timer] Start';
export class TimerStart implements Action {
  readonly type = TIMER_START;
  constructor() { }
}

export const TIMER_STOP = '[Timer] Stop';
export class TimerStop implements Action {
  readonly type = TIMER_STOP;
  constructor() { }
}

export type All = TimerStart | TimerStop;
