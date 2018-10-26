import { Action } from '@ngrx/store';

import { HistoryEntity } from '../reducers/history.reducer';

import { AddTimerInfo, TimerInfo } from '../models';

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

export const SET_START_TIME = '[Timer] Set Start Time';
export class SetStartTime implements Action {
  readonly type = SET_START_TIME;
  constructor(public startTime: number) { }
}

export const SAVE_TIMER_INFO = '[Timer] Save Timer Info';
export class SaveTimerInfo implements Action {
  readonly type = SAVE_TIMER_INFO;
  constructor(public info: AddTimerInfo) { }
}

export const SAVE_TIMER_INFO_SUCCEEDED = '[Timer] Save Timer Info Succeeded';
export class SaveTimerInfoSucceeded implements Action {
  readonly type = SAVE_TIMER_INFO_SUCCEEDED;
  constructor(public item: HistoryEntity) { }
}

export const CANCEL_TIMER = '[Timer] Cancel Timer';
export class CancelTimer implements Action {
  readonly type = CANCEL_TIMER;
  constructor() { }
}

export const LOAD_TIMER_INFO = '[Timer] Load Info';
export class LoadTimerInfo implements Action {
  readonly type = LOAD_TIMER_INFO;
  constructor(public userId: string) { }
}

export const SET_TIMER_INFO = '[Timer] Set Timer Info';
export class SetTimerInfo implements Action {
  readonly type = SET_TIMER_INFO;
  constructor(public info: TimerInfo) { }
}

export type All = ResetTimer |
  SetGame |
  SetPlatform |
  SetStartTime |
  SaveTimerInfo |
  SaveTimerInfoSucceeded |
  CancelTimer |
  LoadTimerInfo |
  SetTimerInfo;
