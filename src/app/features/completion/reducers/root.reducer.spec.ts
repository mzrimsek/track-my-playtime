import { State as AddPlayingState } from './add-playing.reducer';
import { State as ProgressState } from './progress.reducer';
import {
    _selectAddPlayingInfo, _selectCompletedProgress, _selectPlayingProgress, CompletionState, State
} from './root.reducer';

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
          progress: initialProgressState
        };
        const state: State = { completion: completionState };

        const result = _selectAddPlayingInfo(state);

        expect(result).toEqual(addPlaying);
      });
    });
  });

  describe('Progress State Selectors', () => {
    describe('_selectPlayingProgress', () => {
      it('Should return an empty list when there are no items', () => {
        const completionState: CompletionState = {
          addPlaying: initialAddPlayingState,
          progress: initialProgressState
        };
        const state: State = { completion: completionState };

        const result = _selectPlayingProgress(state);

        expect(result.length).toBe(0);
      });

      it('Should return an empty list when all have end entry ids', () => {
        const progress: ProgressState = {
          ids: ['1', '2'],
          entities: {
            '1': {
              id: '1',
              startEntryId: 'start 1',
              endEntryId: 'end 1'
            },
            '2': {
              id: '2',
              startEntryId: 'start 2',
              endEntryId: 'end 2'
            }
          },
          loading: false
        };
        const completionState: CompletionState = {
          addPlaying: initialAddPlayingState,
          progress
        };
        const state: State = { completion: completionState };

        const result = _selectPlayingProgress(state);

        expect(result.length).toBe(0);
      });

      it('Should return correct items', () => {
        const progress: ProgressState = {
          ids: ['1', '2'],
          entities: {
            '1': {
              id: '1',
              startEntryId: 'start 1',
              endEntryId: 'end 1'
            },
            '2': {
              id: '2',
              startEntryId: 'start 2',
              endEntryId: ''
            }
          },
          loading: false
        };
        const completionState: CompletionState = {
          addPlaying: initialAddPlayingState,
          progress
        };
        const state: State = { completion: completionState };

        const result = _selectPlayingProgress(state);

        expect(result).toEqual([{
          id: '2',
          startEntryId: 'start 2',
          endEntryId: ''
        }]);
      });
    });

    describe('_selectCompletedProgress', () => {
      it('Should return an empty list when there are no items', () => {
        const completionState: CompletionState = {
          addPlaying: initialAddPlayingState,
          progress: initialProgressState
        };
        const state: State = { completion: completionState };

        const result = _selectCompletedProgress(state);

        expect(result.length).toBe(0);
      });

      it('Should return an empty list when none have end entry ids', () => {
        const progress: ProgressState = {
          ids: ['1', '2'],
          entities: {
            '1': {
              id: '1',
              startEntryId: 'start 1',
              endEntryId: ''
            },
            '2': {
              id: '2',
              startEntryId: 'start 2',
              endEntryId: ''
            }
          },
          loading: false
        };
        const completionState: CompletionState = {
          addPlaying: initialAddPlayingState,
          progress
        };
        const state: State = { completion: completionState };

        const result = _selectCompletedProgress(state);

        expect(result.length).toBe(0);
      });

      it('Should return correct items', () => {
        const progress: ProgressState = {
          ids: ['1', '2'],
          entities: {
            '1': {
              id: '1',
              startEntryId: 'start 1',
              endEntryId: 'end 1'
            },
            '2': {
              id: '2',
              startEntryId: 'start 2',
              endEntryId: ''
            }
          },
          loading: false
        };
        const completionState: CompletionState = {
          addPlaying: initialAddPlayingState,
          progress
        };
        const state: State = { completion: completionState };

        const result = _selectCompletedProgress(state);

        expect(result).toEqual([{
          id: '1',
          startEntryId: 'start 1',
          endEntryId: 'end 1'
        }]);
      });
    });
  });
});

const initialAddPlayingState: AddPlayingState = {
  game: '',
  platform: '',
  startTime: 0
};

const initialProgressState: ProgressState = {
  ids: [],
  entities: {},
  loading: false
};
