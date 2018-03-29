import { Action } from '@ngrx/store';

import { HistoryEntity } from '../reducers/history.reducer';

export const ADD_NEW_HISTORY_ITEM = '[History] Add New History Item';
export class AddNewHistoryItem implements Action {
  readonly type = ADD_NEW_HISTORY_ITEM;
  constructor(public item: HistoryEntity) { }
}

export const LOAD_HISTORY_ITEMS = '[History] Load Items';
export class LoadHistoryItems implements Action {
  readonly type = LOAD_HISTORY_ITEMS;
  constructor() { }
}

export const LOAD_HISTORY_ITEMS_SUCCEEDED = '[History] Load Items Succeeded';
export class LoadHistoryItemsSucceeded implements Action {
  readonly type = LOAD_HISTORY_ITEMS_SUCCEEDED;
  constructor(public items: HistoryEntity[]) { }
}

export const REMOVE_HISTORY_ITEM = '[History] Remove Item';
export class RemoveHistoryItem implements Action {
  readonly type = REMOVE_HISTORY_ITEM;
  constructor(public id: string) { }
}

export const REMOVE_HISTORY_ITEM_SUCCEEDED = '[History] Remove Item Succeeded';
export class RemoveHistoryItemSucceeded implements Action {
  readonly type = REMOVE_HISTORY_ITEM_SUCCEEDED;
  constructor(public id: string) { }
}

export const UPDATE_GAME = '[History] Update Game';
export class UpdateGame implements Action {
  readonly type = UPDATE_GAME;
  constructor(public id: string, public game: string) { }
}

export const UPDATE_GAME_SUCCEEDED = '[History] Update Game Succeeded';
export class UpdateGameSucceeded implements Action {
  readonly type = UPDATE_GAME_SUCCEEDED;
  constructor(public id: string, public game: string) { }
}

export const UPDATE_PLATFORM = '[History] Update Platform';
export class UpdatePlatform implements Action {
  readonly type = UPDATE_PLATFORM;
  constructor(public id: string, public platform: string) { }
}

export const UPDATE_PLATFORM_SUCCEEDED = '[History] Update Platform Succeeded';
export class UpdatePlatformSucceeded implements Action {
  readonly type = UPDATE_PLATFORM_SUCCEEDED;
  constructor(public id: string, public platform: string) { }
}

export const UPDATE_ELAPSED_TIME = '[History] Update Elapsed Time';
export class UpdateElapsedTime implements Action {
  readonly type = UPDATE_ELAPSED_TIME;
  constructor(public id: string, public startTime: number, public endTime: number) { }
}

export const UPDATE_ELAPSED_TIME_SUCCEEDED = '[History] Update Elapsed Time Succeeded';
export class UpdateElapsedTimeSucceeded implements Action {
  readonly type = UPDATE_ELAPSED_TIME_SUCCEEDED;
  constructor(public id: string, public startTime: number, public endTime: number) { }
}

export const CLEAR_HISTORY_ITEMS = '[History] Clear Items';
export class ClearHistoryItems implements Action {
  readonly type = CLEAR_HISTORY_ITEMS;
  constructor() { }
}

export type All = AddNewHistoryItem |
  LoadHistoryItems |
  LoadHistoryItemsSucceeded |
  RemoveHistoryItem |
  RemoveHistoryItemSucceeded |
  UpdateGame |
  UpdateGameSucceeded |
  UpdatePlatform |
  UpdatePlatformSucceeded |
  UpdateElapsedTime |
  UpdateElapsedTimeSucceeded |
  ClearHistoryItems;
