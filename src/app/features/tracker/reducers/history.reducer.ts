import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { tassign } from 'tassign';

import * as actions from '../actions/history.actions';

export interface HistoryEntity {
  id: string;
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
}

export interface State extends EntityState<HistoryEntity> {
  loading: boolean;
}

export const adapter: EntityAdapter<HistoryEntity> = createEntityAdapter<HistoryEntity>();
const initialState: State = adapter.getInitialState({
  loading: false
});

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.ADD_NEW_HISTORY_ITEM: {
      return adapter.addOne(action.item, state);
    }
    case actions.LOAD_HISTORY_ITEMS: {
      return tassign(state, { loading: true });
    }
    case actions.LOAD_HISTORY_ITEMS_SUCCEEDED: {
      const newState = adapter.addAll(action.items, state);
      return tassign(newState, { loading: false });
    }
    case actions.REMOVE_HISTORY_ITEM_SUCCEEDED: {
      return adapter.removeOne(action.itemId, state);
    }
    case actions.UPDATE_GAME_SUCCEEDED: {
      const { itemId, game } = action.payload;
      return adapter.updateOne({
        id: itemId,
        changes: {
          game
        }
      }, state);
    }
    case actions.UPDATE_PLATFORM_SUCCEEDED: {
      const { itemId, platform } = action.payload;
      return adapter.updateOne({
        id: itemId,
        changes: {
          platform
        }
      }, state);
    }
    case actions.UPDATE_ELAPSED_TIME_SUCCEEDED: {
      const { itemId, startTime, endTime } = action.payload;
      return adapter.updateOne({
        id: itemId,
        changes: {
          startTime,
          endTime
        }
      }, state);
    }
    case actions.CLEAR_HISTORY_ITEMS: {
      return adapter.removeAll(state);
    }
    default: {
      return state;
    }
  }
}
