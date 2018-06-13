import { Action } from '@ngrx/store';

export const SET_GAME = '[Add Playing] Set Game';
export class SetGame implements Action {
  readonly type = SET_GAME;
  constructor(public game: string) { }
}

export const SET_PLATFORM = '[Add Playing] Set Platform';
export class SetPlatform implements Action {
  readonly type = SET_PLATFORM;
  constructor(public platform: string) { }
}

export const SET_STARTTIME = '[Add Playing] Set StartTime';
export class SetStartTime implements Action {
  readonly type = SET_STARTTIME;
  constructor(public startTime: number) { }
}

export type All = SetGame |
  SetPlatform |
  SetStartTime;
