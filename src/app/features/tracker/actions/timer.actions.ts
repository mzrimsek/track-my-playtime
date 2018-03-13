import { Action } from '@ngrx/store';
import { TimerInfo, HistoryListItem } from '../models';

export const START_TIMER = '[Timer] Start Timer';
export class StartTimer implements Action {
  readonly type = START_TIMER;
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

export const CANCEL_TIMER = '[Timer] Cancel Timer';
export class CancelTimer implements Action {
  readonly type = CANCEL_TIMER;
  constructor() { }
}


export type All = StartTimer |
  ResetTimer |
  SetGame |
  SetPlatform |
  LoadPlatforms |
  LoadPlatformsSucceeded |
  SaveTimerInfo |
  SaveTimerInfoSucceeded |
  CancelTimer;
