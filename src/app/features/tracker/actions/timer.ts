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

export const SET_GAME = '[Timer] Set Game';
export class SetGame implements Action {
  readonly type = SET_GAME;
  constructor(public game: string) { }
}

export const SET_PLATFORM = '[Timer] Set Platform';
export class SetPlatform implements Action {
  readonly type = SET_PLATFORM;
  constructor(public platform: string) { }
}

export type All = TimerStart | TimerStop | SetGame | SetPlatform;
