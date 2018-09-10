import { _selectEntriesToShow, State, TrackerState } from './root.reducer';

describe('Tracker Root Reducer', () => {
  describe('Display State Selectors', () => {
    describe('_selectEntriesToShow', () => {
      it('Should return the entriesToShow', () => {
        const entriesToShow = 7;
        const trackerState: TrackerState = {
          display: {
            entriesToShow
          }
        };
        const state: State = { tracker: trackerState };

        const result = _selectEntriesToShow(state);

        expect(result).toBe(entriesToShow);
      });
    });
  });
});
