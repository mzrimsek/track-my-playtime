import { Action } from '@ngrx/store';
import { TimerInfo } from '../models';

export const TIMER_START = '[Timer] Start Timer';
export class TimerStart implements Action {
  readonly type = TIMER_START;
  constructor() { }
}

export const TIMER_STOP = '[Timer] Stop Timer';
export class TimerStop implements Action {
  readonly type = TIMER_STOP;
  constructor(public timerInfo: TimerInfo, public endTime: Date) { }
}

export const RESET_TIMER = '[Timer] Reset Timer';
export class ResetTimer implements Action {
  readonly type = RESET_TIMER;
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

export const LOAD_PLATFORMS = '[Timer] Load Platforms';
export class LoadPlatforms implements Action {
  readonly type = LOAD_PLATFORMS;
  constructor() { }
}

export const LOAD_PLATFORMS_SUCCEEDED = '[Timer] Load Platforms Succeeded';
export class LoadPlatformsSucceeded implements Action {
  readonly type = LOAD_PLATFORMS_SUCCEEDED;
  constructor(public platforms: string[]) { }
}

export type All = TimerStart |
  TimerStop |
  ResetTimer |
  SetGame |
  SetPlatform |
  LoadPlatforms |
  LoadPlatformsSucceeded;
