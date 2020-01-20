import { State as AddPlayingState } from 'features/completion/reducers/add-playing.reducer';
import { State as MarkCompleteState } from 'features/completion/reducers/mark-complete.reducer';
import { State as TabState } from 'features/completion/reducers/tab.reducer';

import { PlayingDisplayData } from 'features/completion/models';

export namespace completion {
  export const testPlayingDisplayData: PlayingDisplayData = {
    item: {
      id: '1',
      startEntryId: 'start 1',
      endEntryId: '',
      notes: ''
    },
    startEntryData: {
      id: 'start 1',
      game: 'some game',
      platform: 'some platform',
      startTime: 3000,
      endTime: 6000,
      dateRange: [new Date(3000), new Date(6000)],
      locked: false
    },
    timePlayed: 3,
    endDates: [6000],
    markComplete: {
      id: '1',
      showExtra: false,
      endTime: 0
    }
  };

  export const initialAddPlayingState: AddPlayingState = {
    game: '',
    platform: '',
    startTime: 0
  };

  export const initialMarkCompleteState: MarkCompleteState = {
    ids: [],
    entities: {}
  };

  export const initialTabState: TabState = {
    tab: 'PLAYING'
  };
}
