import { Action } from '@ngrx/store';
import { HistoryListItem } from '../models';

export const ADD_NEW_HISTORY_ITEM = '[History] Add New History Item';
export class AddNewHistoryItem implements Action {
  readonly type = ADD_NEW_HISTORY_ITEM;
  constructor(public item: HistoryListItem) { }
}

export const LOAD_HISTORY_ITEMS = '[History] Load Items';
export class LoadHistoryItems implements Action {
  readonly type = LOAD_HISTORY_ITEMS;
  constructor() { }
}

export const LOAD_HISTORY_ITEMS_SUCCEEDED = '[History] Load Items Succeeded';
export class LoadHistoryItemsSucceeded implements Action {
  readonly type = LOAD_HISTORY_ITEMS_SUCCEEDED;
  constructor(public items: HistoryListItem[]) { }
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

export const UPDATE_PLATFORM = '[History] Update Platform';
export class UpdatePlatform implements Action {
  readonly type = UPDATE_PLATFORM;
  constructor(public id: string, public platform: string) { }
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
  UpdatePlatform |
  ClearHistoryItems;
