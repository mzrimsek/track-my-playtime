import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { tassign } from 'tassign';

import * as actions from '../actions/history.actions';

import {
    UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload, UpdateHistoryItemTimesPayload
} from '../models';

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

export type UpdatePayload = UpdateHistoryItemGamePayload | UpdateHistoryItemPlatformPayload | UpdateHistoryItemTimesPayload;
const getUpdatedState = (payload: UpdatePayload, currentState: State): State => {
  const { itemId: id, ...changes } = payload;
  return adapter.updateOne({
    id,
    changes
  }, currentState);
};

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
      return getUpdatedState(action.payload, state);
    }
    case actions.UPDATE_PLATFORM_SUCCEEDED: {
      return getUpdatedState(action.payload, state);
    }
    case actions.UPDATE_ELAPSED_TIME_SUCCEEDED: {
      return getUpdatedState(action.payload, state);
    }
    case actions.CLEAR_HISTORY_ITEMS: {
      return adapter.removeAll(state);
    }
    default: {
      return state;
    }
  }
}
