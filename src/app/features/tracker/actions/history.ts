import { Action } from '@ngrx/store';
import { HistoryListItem } from '../models';

export const ADD_NEW_HISTORY_ITEM = '[History] Add New History Item';
export class AddNewHistoryItem implements Action {
  readonly type = ADD_NEW_HISTORY_ITEM;
  constructor(public item: HistoryListItem) { }
}

export type All = AddNewHistoryItem;
