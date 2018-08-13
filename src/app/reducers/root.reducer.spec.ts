import { State as ErrorState } from './error.reducer';
import { _selectError, State } from './root.reducer';

describe('Root Reducer', () => {
  describe('Error State Selectors', () => {
    describe('_selectError', () => {
      it('Should return last error', () => {
        const errorState: ErrorState = {
          action: 'some action',
          message: 'some error message'
        };
        const state: State = {
          router: initialRouterState,
          error: errorState
        };

        const result = _selectError(state);

        expect(result).toEqual({
          action: 'some action',
          message: 'some error message'
        });
      });
    });
  });
});

const initialRouterState = {
  state: {
    url: '',
    params: {},
    queryParams: {}
  },
  navigationId: 1
};
