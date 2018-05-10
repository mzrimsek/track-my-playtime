import { Action } from '@ngrx/store';

import { HistoryEntity } from '../reducers/history.reducer';

import {
    UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload, UpdateHistoryItemTimesPayload
} from '../../../shared/models';

export const ADD_NEW_HISTORY_ITEM = '[History] Add New History Item';
export class AddNewHistoryItem implements Action {
  readonly type = ADD_NEW_HISTORY_ITEM;
  constructor(public item: HistoryEntity) { }
}

export const LOAD_HISTORY_ITEMS = '[History] Load Items';
export class LoadHistoryItems implements Action {
  readonly type = LOAD_HISTORY_ITEMS;
  constructor(public userId: string) { }
}

export const LOAD_HISTORY_ITEMS_SUCCEEDED = '[History] Load Items Succeeded';
export class LoadHistoryItemsSucceeded implements Action {
  readonly type = LOAD_HISTORY_ITEMS_SUCCEEDED;
  constructor(public items: HistoryEntity[]) { }
}

export const REMOVE_HISTORY_ITEM = '[History] Remove Item';
export class RemoveHistoryItem implements Action {
  readonly type = REMOVE_HISTORY_ITEM;
  constructor(public userId: string, public itemId: string) { }
}

export const REMOVE_HISTORY_ITEM_SUCCEEDED = '[History] Remove Item Succeeded';
export class RemoveHistoryItemSucceeded implements Action {
  readonly type = REMOVE_HISTORY_ITEM_SUCCEEDED;
  constructor(public itemId: string) { }
}

export const UPDATE_GAME = '[History] Update Game';
export class UpdateGame implements Action {
  readonly type = UPDATE_GAME;
  constructor(public userId: string, public payload: UpdateHistoryItemGamePayload) { }
}

export const UPDATE_GAME_SUCCEEDED = '[History] Update Game Succeeded';
export class UpdateGameSucceeded implements Action {
  readonly type = UPDATE_GAME_SUCCEEDED;
  constructor(public payload: UpdateHistoryItemGamePayload) { }
}

export const UPDATE_PLATFORM = '[History] Update Platform';
export class UpdatePlatform implements Action {
  readonly type = UPDATE_PLATFORM;
  constructor(public userId: string, public payload: UpdateHistoryItemPlatformPayload) { }
}

export const UPDATE_PLATFORM_SUCCEEDED = '[History] Update Platform Succeeded';
export class UpdatePlatformSucceeded implements Action {
  readonly type = UPDATE_PLATFORM_SUCCEEDED;
  constructor(public payload: UpdateHistoryItemPlatformPayload) { }
}

export const UPDATE_ELAPSED_TIME = '[History] Update Elapsed Time';
export class UpdateElapsedTime implements Action {
  readonly type = UPDATE_ELAPSED_TIME;
  constructor(public userId: string, public payload: UpdateHistoryItemTimesPayload) { }
}

export const UPDATE_ELAPSED_TIME_SUCCEEDED = '[History] Update Elapsed Time Succeeded';
export class UpdateElapsedTimeSucceeded implements Action {
  readonly type = UPDATE_ELAPSED_TIME_SUCCEEDED;
  constructor(public payload: UpdateHistoryItemTimesPayload) { }
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
