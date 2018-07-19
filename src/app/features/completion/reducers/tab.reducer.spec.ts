import * as actions from '../actions/tab.actions';

import { reducer, State } from './tab.reducer';

describe('Tab Reducer', () => {
  describe('When SetVisibleTab is dispatched', () => {
    it('Should set tab', () => {
      const initialState: State = {
        tab: 'PLAYING'
      };
      const result = reducer(initialState, new actions.SetVisibleTab('COMPLETED'));
      expect(result).toEqual({ tab: 'COMPLETED' });
    });
  });
});
