import { State as AddPlayingState } from './add-playing.reducer';
import { _selectAddPlayingInfo, _selectVisibleTab, CompletionState, State } from './root.reducer';
import { State as TabState } from './tab.reducer';

import { completion } from '../../../test-helpers';

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
          markComplete: completion.initialMarkCompleteState,
          tab: completion.initialTabState
        };
        const state: State = { completion: completionState };

        const result = _selectAddPlayingInfo(state);

        expect(result).toEqual(addPlaying);
      });
    });
  });

  describe('Tab State Selectors', () => {
    describe('_selectVisibleTab', () => {
      it('Should return the visible tab', () => {
        const tab: TabState = {
          tab: 'COMPLETED'
        };
        const completionState: CompletionState = {
          addPlaying: completion.initialAddPlayingState,
          markComplete: completion.initialMarkCompleteState,
          tab
        };
        const state: State = { completion: completionState };

        const result = _selectVisibleTab(state);

        expect(result).toEqual('COMPLETED');
      });
    });
  });
});
