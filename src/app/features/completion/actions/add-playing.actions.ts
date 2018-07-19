import { Action } from '@ngrx/store';

import { ProgressEntity } from '../../../shared/reducers/progress.reducer';

import { AddPlaying } from '../models';

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

export const RESET = '[Add Playing] Reset';
export class Reset implements Action {
  readonly type = RESET;
  constructor() { }
}

export const SAVE = '[Add Playing] Save';
export class Save implements Action {
  readonly type = SAVE;
  constructor(public addPlaying: AddPlaying) { }
}

export const SAVE_SUCCEEDED = '[Add Playing] Save Succeeded';
export class SaveSucceeded implements Action {
  readonly type = SAVE_SUCCEEDED;
  constructor(public item: ProgressEntity) { }
}

export type All = SetGame |
  SetPlatform |
  SetStartTime |
  Reset |
  Save |
  SaveSucceeded;
