import { Action } from '@ngrx/store';

import { CompletionTabs } from '../models';

export const SET_VISIBLE_TAB = '[Tab] Set Visible Tab';
export class SetVisibleTab implements Action {
    readonly type = SET_VISIBLE_TAB;
    constructor(public tab: CompletionTabs) { }
}

export type All = SetVisibleTab;
