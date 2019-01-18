import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as actions from '../actions/progress.actions';

export interface ProgressEntity {
  id: string;
  startEntryId: string;
  endEntryId: string;
  notes: string;
}

export interface State extends EntityState<ProgressEntity> {
  loading: boolean;
}

export const adapter: EntityAdapter<ProgressEntity> = createEntityAdapter<ProgressEntity>();
const initialState: State = adapter.getInitialState({
  loading: false
});

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.ADD_NEW_PROGRESS_ITEM: {
      return adapter.addOne(action.item, state);
    }
    case actions.LOAD_PROGRESS_ITEMS: {
      return {
        ...state,
        loading: true
      };
    }
    case actions.LOAD_PROGRESS_ITEMS_SUCCEEDED: {
      const newState = adapter.addAll(action.items, state);
      return {
        ...newState,
        loading: false
      };
    }
    case actions.REMOVE_PROGRESS_ITEM_SUCCEEDED: {
      return adapter.removeOne(action.itemId, state);
    }
    case actions.MARK_COMPLETE_SUCCEEDED: {
      const { itemId: id, ...changes } = action.payload;
      return adapter.updateOne({
        id,
        changes
      }, state);
    }
    case actions.SET_NOTES_SUCCEEDED: {
      const { itemId: id, ...changes } = action.payload;
      return adapter.updateOne({
        id,
        changes
      }, state);
    }
    default: {
      return state;
    }
  }
}
