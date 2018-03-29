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
      return adapter.removeOne(action.id, state);
    }
    case actions.UPDATE_GAME_SUCCEEDED: {
      return adapter.updateOne({
        id: action.id,
        changes: {
          game: action.game
        }
      }, state);
    }
    case actions.UPDATE_PLATFORM_SUCCEEDED: {
      return adapter.updateOne({
        id: action.id,
        changes: {
          platform: action.platform
        }
      }, state);
    }
    case actions.UPDATE_ELAPSED_TIME_SUCCEEDED: {
      return adapter.updateOne({
        id: action.id,
        changes: {
          startTime: action.startTime,
          endTime: action.endTime
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
