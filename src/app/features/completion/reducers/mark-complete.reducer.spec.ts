import * as actions from '../actions/mark-complete.actions';

import { reducer, State } from './mark-complete.reducer';

describe('Mark Complete Reducer', () => {
  it('Should add an item when AddNewItem is dispatched', () => {
    const initialState: State = {
      ids: [],
      entities: {},
    };
    const newState = reducer(initialState, new actions.AddNewItem('some item id'));
    expect(newState).toEqual({
      ids: ['some item id'],
      entities: {
        ['some item id']: {
          id: 'some item id',
          showExtra: false,
          endTime: 0
        }
      }
    });
  });

  it('Should add all items when LoadItems is dispatched', () => {
    const initialState: State = {
      ids: [],
      entities: {}
    };
    const newState = reducer(initialState, new actions.LoadItems(['some item id', 'some item id 2']));
    expect(newState).toEqual({
      ids: ['some item id', 'some item id 2'],
      entities: {
        ['some item id']: {
          id: 'some item id',
          showExtra: false,
          endTime: 0
        },
        ['some item id 2']: {
          id: 'some item id 2',
          showExtra: false,
          endTime: 0
        }
      }
    });
  });

  it('Should remove item when Remove is dispatched', () => {
    const initialState: State = {
      ids: ['some item id', 'some item id 2'],
      entities: {
        ['some item id']: {
          id: 'some item id',
          showExtra: false,
          endTime: 0
        },
        ['some item id 2']: {
          id: 'some item id 2',
          showExtra: true,
          endTime: 10
        }
      }
    };
    const newState = reducer(initialState, new actions.Remove('some item id'));
    expect(newState).toEqual({
      ids: ['some item id 2'],
      entities: {
        ['some item id 2']: {
          id: 'some item id 2',
          showExtra: true,
          endTime: 10
        }
      }
    });
  });

  it('Should set item showExtra when SetShowExtra is dispatched', () => {
    const initialState: State = {
      ids: ['some item id', 'some item id 2'],
      entities: {
        ['some item id']: {
          id: 'some item id',
          showExtra: false,
          endTime: 0
        },
        ['some item id 2']: {
          id: 'some item id 2',
          showExtra: true,
          endTime: 10
        }
      }
    };
    const newState = reducer(initialState, new actions.SetShowExtra('some item id', true));
    expect(newState).toEqual({
      ids: ['some item id', 'some item id 2'],
      entities: {
        ['some item id']: {
          id: 'some item id',
          showExtra: true,
          endTime: 0
        },
        ['some item id 2']: {
          id: 'some item id 2',
          showExtra: true,
          endTime: 10
        }
      }
    });
  });

  it('Should set item endTime when SetEndTime is dispatched', () => {
    const initialState: State = {
      ids: ['some item id', 'some item id 2'],
      entities: {
        ['some item id']: {
          id: 'some item id',
          showExtra: false,
          endTime: 0
        },
        ['some item id 2']: {
          id: 'some item id 2',
          showExtra: true,
          endTime: 10
        }
      }
    };
    const newState = reducer(initialState, new actions.SetEndTime('some item id', 5000));
    expect(newState).toEqual({
      ids: ['some item id', 'some item id 2'],
      entities: {
        ['some item id']: {
          id: 'some item id',
          showExtra: false,
          endTime: 5000
        },
        ['some item id 2']: {
          id: 'some item id 2',
          showExtra: true,
          endTime: 10
        }
      }
    });
  });
});
