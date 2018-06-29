import { State as AddPlayingState } from './add-playing.reducer';
import { State as MarkCompleteState } from './mark-complete.reducer';
import { _selectAddPlayingInfo, CompletionState, State } from './root.reducer';

describe('Completion Root Reducer', () => {
  describe('AddPlaying State Selectors', () => {
    describe('_selectAddPlayingInfo', () => {
      it('Should return the addPlaying info', () => {
        const addPlaying: AddPlayingState = {
          game: 'some cool game',
          platform: 'some awesome platform',
          startTime: 1523563
        };
        const completionState: CompletionState = {
          addPlaying,
          markComplete: initialMarkCompleteState
        };
        const state: State = { completion: completionState };

        const result = _selectAddPlayingInfo(state);

        expect(result).toEqual(addPlaying);
      });
    });
  });
});

const initialMarkCompleteState: MarkCompleteState = {
  ids: [],
  entities: {}
};
