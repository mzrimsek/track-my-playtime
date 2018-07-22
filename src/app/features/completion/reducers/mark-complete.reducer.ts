import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as actions from '../actions/mark-complete.actions';

export interface MarkCompleteEntity {
  id: string;
  showExtra: boolean;
  endTime: number;
}

export interface State extends EntityState<MarkCompleteEntity> { }

export const adapter: EntityAdapter<MarkCompleteEntity> = createEntityAdapter<MarkCompleteEntity>();
const initialState: State = adapter.getInitialState();

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_SHOW_EXTRA: {
      return adapter.updateOne({
        id: action.itemId,
        changes: {
          showExtra: action.showExtra
        }
      }, state);
    }
    case actions.SET_ENDTIME: {
      return adapter.updateOne({
        id: action.itemId,
        changes: {
          endTime: action.endTime
        }
      }, state);
    }
    case actions.REMOVE: {
      return adapter.removeOne(action.itemId, state);
    }
    case actions.ADD_NEW_ITEM: {
      return adapter.addOne(getMarkCompleteEntity(action.itemId), state);
    }
    case actions.LOAD_ITEMS: {
      const items = action.itemIds.map(itemId => getMarkCompleteEntity(itemId));
      return adapter.addAll(items, state);
    }
    case actions.CLEAR_ITEMS: {
      return adapter.removeAll(state);
    }
    default: {
      return state;
    }
  }
}

const getMarkCompleteEntity = (itemId: string): MarkCompleteEntity => {
  return {
    id: itemId,
    showExtra: false,
    endTime: 0
  };
};
