import { Action } from '@ngrx/store';
import { TimerInfo, HistoryListItem } from '../models';

export const TIMER_START = '[Timer] Start Timer';
export class TimerStart implements Action {
  readonly type = TIMER_START;
  constructor() { }
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

export const SAVE_TIMER_INFO = '[Timer] Save Timer Info';
export class SaveTimerInfo implements Action {
  readonly type = SAVE_TIMER_INFO;
  constructor(public info: TimerInfo, public endTime: Date) { }
}

export const SAVE_TIMER_INFO_SUCCEEDED = '[Timer] Save Timer Info Succeeded';
export class SaveTimerInfoSucceeded implements Action {
  readonly type = SAVE_TIMER_INFO_SUCCEEDED;
  constructor(public item: HistoryListItem) { }
}

export type All = TimerStart |
  ResetTimer |
  SetGame |
  SetPlatform |
  LoadPlatforms |
  LoadPlatformsSucceeded |
  SaveTimerInfo |
  SaveTimerInfoSucceeded;
