import * as actions from '../actions/history.actions';

import { HistoryEntity, reducer, State } from './history.reducer';

import {
    UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload, UpdateHistoryItemTimesPayload
} from '../models';

describe('History Reducer', () => {
  it('Should add an item when Add New History Item is dispatched', () => {
    const initialState: State = {
      ids: [],
      entities: {},
      loading: false
    };
    const item = getHistoryEntity('1');

    const newState = reducer(initialState, new actions.AddNewHistoryItem(item));

    expect(newState).toEqual({
      ...initialState,
      ids: [item.id],
      entities: {
        [item.id]: item
      }
    });
  });

  it('Should set loading to true when Load History Items is dispatched', () => {
    const initialState: State = {
      ids: [],
      entities: {},
      loading: false
    };
    const newState = reducer(initialState, new actions.LoadHistoryItems(''));
    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('Should add all items when Load History Items Succeeded is dispatched', () => {
    const initialState: State = {
      ids: [],
      entities: {},
      loading: false
    };
    const item1 = getHistoryEntity('1');
    const item2 = getHistoryEntity('2');

    const newState = reducer(initialState, new actions.LoadHistoryItemsSucceeded([item1, item2]));

    expect(newState).toEqual({
      ...initialState,
      ids: [item1.id, item2.id],
      entities: {
        [item1.id]: item1,
        [item2.id]: item2
      }
    });
  });

  it('Should remove correct item when Remove History Item Succeeded is dispatched', () => {
    const item1 = getHistoryEntity('1');
    const item2 = getHistoryEntity('2');
    const initialState: State = {
      ids: [item1.id, item2.id],
      entities: {
        [item1.id]: item1,
        [item2.id]: item2
      },
      loading: false
    };

    const newState = reducer(initialState, new actions.RemoveHistoryItemSucceeded(item1.id));

    expect(newState).toEqual({
      ...initialState,
      ids: [item2.id],
      entities: {
        [item2.id]: item2
      }
    });
  });

  it('Should update correct item game when Update Game Succeeded is dispatched', () => {
    const item1 = getHistoryEntity('1');
    const item2 = getHistoryEntity('2');
    const initialState: State = {
      ids: [item1.id, item2.id],
      entities: {
        [item1.id]: item1,
        [item2.id]: item2
      },
      loading: false
    };
    const updateInfo: UpdateHistoryItemGamePayload = {
      itemId: item1.id,
      game: 'some other cool game'
    };

    const newState = reducer(initialState, new actions.UpdateGameSucceeded(updateInfo));

    expect(newState).toEqual({
      ...initialState,
      entities: {
        [item1.id]: {
          ...item1,
          game: updateInfo.game
        },
        [item2.id]: item2
      }
    });
  });

  it('Should update correct item platform when Update Platform Succeeded is dispatched', () => {
    const item1 = getHistoryEntity('1');
    const item2 = getHistoryEntity('2');
    const initialState: State = {
      ids: [item1.id, item2.id],
      entities: {
        [item1.id]: item1,
        [item2.id]: item2
      },
      loading: false
    };
    const updateInfo: UpdateHistoryItemPlatformPayload = {
      itemId: item1.id,
      platform: 'some other awesome platform'
    };

    const newState = reducer(initialState, new actions.UpdatePlatformSucceeded(updateInfo));

    expect(newState).toEqual({
      ...initialState,
      entities: {
        [item1.id]: {
          ...item1,
          platform: updateInfo.platform
        },
        [item2.id]: item2
      }
    });
  });

  it('Should update correct item elapsed time when Update Elapsed Time Succeeded is dispatched', () => {
    const item1 = getHistoryEntity('1');
    const item2 = getHistoryEntity('2');
    const initialState: State = {
      ids: [item1.id, item2.id],
      entities: {
        [item1.id]: item1,
        [item2.id]: item2
      },
      loading: false
    };
    const updateInfo: UpdateHistoryItemTimesPayload = {
      itemId: item1.id,
      startTime: 12341234,
      endTime: 115321532
    };

    const newState = reducer(initialState, new actions.UpdateElapsedTimeSucceeded(updateInfo));

    expect(newState).toEqual({
      ...initialState,
      entities: {
        [item1.id]: {
          ...item1,
          startTime: updateInfo.startTime,
          endTime: updateInfo.endTime
        },
        [item2.id]: item2
      }
    });
  });

  it('Should remove all items when Clear History Items is dispatched', () => {
    const item1 = getHistoryEntity('1');
    const item2 = getHistoryEntity('2');
    const initialState: State = {
      ids: [item1.id, item2.id],
      entities: {
        [item1.id]: item1,
        [item2.id]: item2
      },
      loading: false
    };

    const newState = reducer(initialState, new actions.ClearHistoryItems());

    expect(newState).toEqual({
      ...initialState,
      ids: [],
      entities: {}
    });
  });
});

const getHistoryEntity = (id: string): HistoryEntity => {
  return {
    id,
    game: 'some cool game',
    platform: 'some awesome platform',
    startTime: 12,
    endTime: 83
  };
};
