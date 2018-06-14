import { Action } from '@ngrx/store';

import { ProgressEntity } from '../reducers/progress.reducer';

export const ADD_NEW_PROGRESS_ITEM = '[Progress] Add New Progress Item';
export class AddNewProgressItem implements Action {
  readonly type = ADD_NEW_PROGRESS_ITEM;
  constructor(public item: ProgressEntity) { }
}

export const LOAD_PROGRESS_ITEMS = '[Progress] Load Progress Items';
export class LoadProgressItems implements Action {
  readonly type = LOAD_PROGRESS_ITEMS;
  constructor(public userId: string) { }
}

export const LOAD_PROGRESS_ITEMS_SUCCEEDED = '[Progress] Load Progress Items Succeeded';
export class LoadProgressItemsSucceeded implements Action {
  readonly type = LOAD_PROGRESS_ITEMS_SUCCEEDED;
  constructor(public items: ProgressEntity[]) { }
}

export const REMOVE_PROGRESS_ITEM = '[Progress] Remove Progress Item';
export class RemoveProgressItem implements Action {
  readonly type = REMOVE_PROGRESS_ITEM;
  constructor(public userId: string, public itemId: string) { }
}

export const REMOVE_PROGRESS_ITEM_SUCCEEDED = '[Progress] Remove Progress Item Succeeded';
export class RemoveProgressItemSucceeded implements Action {
  readonly type = REMOVE_PROGRESS_ITEM_SUCCEEDED;
  constructor(public itemId: string) { }
}

export const CLEAR_PROGRESS_ITEMS = '[Progress] Clear Items';
export class ClearProgressItems implements Action {
  readonly type = CLEAR_PROGRESS_ITEMS;
  constructor() { }
}

export type All = AddNewProgressItem |
  LoadProgressItems |
  LoadProgressItemsSucceeded |
  RemoveProgressItem |
  RemoveProgressItemSucceeded |
  ClearProgressItems;
