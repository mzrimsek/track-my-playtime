import { Action } from '@ngrx/store';

export const SET_SHOW_EXTRA = '[Mark Complete] Set Show Extra';
export class SetShowExtra implements Action {
  readonly type = SET_SHOW_EXTRA;
  constructor(public itemId: string, public showExtra: boolean) { }
}

export const SET_ENDTIME = '[Mark Complete] Set End Time';
export class SetEndTime implements Action {
  readonly type = SET_ENDTIME;
  constructor(public itemId: string, public endTime: number) { }
}

export const REMOVE = '[Mark Complete] Remove';
export class Remove implements Action {
  readonly type = REMOVE;
  constructor(public itemId: string) { }
}

export const LOAD_ITEMS = '[Mark Complete] Load Items';
export class LoadItems implements Action {
  readonly type = LOAD_ITEMS;
  constructor(public itemIds: string[]) { }
}

export const ADD_NEW_ITEM = '[Mark Complete] Add New Item';
export class AddNewItem implements Action {
  readonly type = ADD_NEW_ITEM;
  constructor(public itemId: string) { }
}

export type All = SetShowExtra |
  SetEndTime |
  Remove |
  LoadItems |
  AddNewItem;
