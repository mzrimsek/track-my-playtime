import { Action } from '@ngrx/store';

import { ProgressEntity } from '../reducers/progress.reducer';

import { MarkCompletePayload, SetNotesPayload } from '../models';

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

export const MARK_COMPLETE = '[Progress] Mark Complete';
export class MarkComplete implements Action {
  readonly type = MARK_COMPLETE;
  constructor(public userId: string, public payload: MarkCompletePayload) { }
}

export const MARK_COMPLETE_SUCCEEDED = '[Progress] Mark Complete Succeeded';
export class MarkCompleteSucceeded implements Action {
  readonly type = MARK_COMPLETE_SUCCEEDED;
  constructor(public payload: MarkCompletePayload) { }
}

export const SET_NOTES = '[Progress] Set Notes';
export class SetNotes implements Action {
  readonly type = SET_NOTES;
  constructor(public userId: string, public payload: SetNotesPayload) { }
}

export const SET_NOTES_SUCCEEDED = '[Progress] Set Notes Succeeded';
export class SetNotesSucceeded implements Action {
  readonly type = SET_NOTES_SUCCEEDED;
  constructor(public payload: SetNotesPayload) { }
}

export type All = AddNewProgressItem |
  LoadProgressItems |
  LoadProgressItemsSucceeded |
  RemoveProgressItem |
  RemoveProgressItemSucceeded |
  MarkComplete |
  MarkCompleteSucceeded |
  SetNotes |
  SetNotesSucceeded;
