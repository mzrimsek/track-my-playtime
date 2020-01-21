import { progress } from 'app/test-helpers';
import * as actions from 'shared/actions/progress.actions';

import { MarkCompletePayload, SetNotesPayload } from 'shared/models';

import { reducer, State } from './progress.reducer';

describe('Progress Reducer', () => {
  it('Should add an item when AddNewProgressItem is dispatched', () => {
    const initialState: State = {
      ids: [],
      entities: {},
      loading: false
    };
    const item = progress.getProgressEntity('1');

    const newState = reducer(initialState, new actions.AddNewProgressItem(item));

    expect(newState).toEqual({
      ...initialState,
      ids: [item.id],
      entities: {
        [item.id]: item
      }
    });
  });

  it('Should set loading to true when LoadProgressItems is dispatched', () => {
    const initialState: State = {
      ids: [],
      entities: {},
      loading: false
    };
    const newState = reducer(initialState, new actions.LoadProgressItems(''));
    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('Should add all items when LoadProgressItemsSucceeded is dispatched', () => {
    const initialState: State = {
      ids: [],
      entities: {},
      loading: false
    };
    const item1 = progress.getProgressEntity('1');
    const item2 = progress.getProgressEntity('2', 'some end entry id');

    const newState = reducer(initialState, new actions.LoadProgressItemsSucceeded([item1, item2]));

    expect(newState).toEqual({
      ...initialState,
      ids: [item1.id, item2.id],
      entities: {
        [item1.id]: item1,
        [item2.id]: item2
      }
    });
  });

  it('Should remove correct item when RemoveProgressItemSucceeded is dispatched', () => {
    const item1 = progress.getProgressEntity('1');
    const item2 = progress.getProgressEntity('2', 'some end entry id');
    const initialState: State = {
      ids: [item1.id, item2.id],
      entities: {
        [item1.id]: item1,
        [item2.id]: item2
      },
      loading: false
    };

    const newState = reducer(initialState, new actions.RemoveProgressItemSucceeded(item1.id));

    expect(newState).toEqual({
      ...initialState,
      ids: [item2.id],
      entities: {
        [item2.id]: item2
      }
    });
  });

  it('Should update endEntryId when MarkCompleteSucceeded is dispatched', () => {
    const item1 = progress.getProgressEntity('1');
    const item2 = progress.getProgressEntity('2', 'some end entry id');
    const initialState: State = {
      ids: [item1.id, item2.id],
      entities: {
        [item1.id]: item1,
        [item2.id]: item2
      },
      loading: false
    };
    const markCompletePayload: MarkCompletePayload = {
      itemId: item1.id,
      endEntryId: 'some end entry id'
    };

    const newState = reducer(initialState, new actions.MarkCompleteSucceeded(markCompletePayload));

    expect(newState).toEqual({
      ...initialState,
      entities: {
        [item1.id]: {
          ...item1,
          endEntryId: markCompletePayload.endEntryId
        },
        [item2.id]: item2
      }
    });
  });

  it('Should set notes when SetNotesSucceeded is dispatched', () => {
    const item1 = progress.getProgressEntity('1');
    const initialState: State = {
      ids: [item1.id],
      entities: {
        [item1.id]: item1
      },
      loading: false
    };
    const setNotesPlayload: SetNotesPayload = {
      itemId: item1.id,
      notes: 'some notes'
    };

    const newState = reducer(initialState, new actions.SetNotesSucceeded(setNotesPlayload));

    expect(newState).toEqual({
      ...initialState,
      entities: {
        [item1.id]: {
          ...item1,
          notes: setNotesPlayload.notes
        }
      }
    });
  });
});
