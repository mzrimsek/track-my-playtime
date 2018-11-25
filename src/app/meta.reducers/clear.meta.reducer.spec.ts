import { combineReducers } from '@ngrx/store';

import { endOfWeek, startOfWeek, subDays } from 'date-fns';

import * as userActions from '../features/auth/actions/user.actions';

import * as fromAuth from '../features/auth/reducers/root.reducer';
import * as fromCompletion from '../features/completion/reducers/root.reducer';
import * as fromDashboard from '../features/dashboard/reducers/root.reducer';
import * as fromProfile from '../features/profile/reducers/root.reducer';
import * as fromTracker from '../features/tracker/reducers/root.reducer';
import * as fromRoot from '../reducers/root.reducer';
import * as fromShared from '../shared/reducers/root.reducer';
import { clearState } from './clear.meta.reducer';

import { auth, completion, history, platforms, progress, tracker, user } from '../test-helpers';

describe('Clear Meta Reducer', () => {
  const action = new userActions.Logout();

  it('Should clear auth state when Logout is dispatched', () => {
    const actionReducer = combineReducers(fromAuth.reducers);
    const authState: fromAuth.AuthState = {
      user: {
        ...user.mockUser
      },
      status: {
        attemptingLogin: true,
        validationMessage: 'Some message'
      }
    };

    const clearedReducer = clearState(actionReducer);
    const result = clearedReducer(authState, action);

    expect(result).toEqual({
      user: user.initialUserState,
      status: auth.initialStatusState
    });
  });

  it('Should clear completion state when Logout is dispatched', () => {
    const actionReducer = combineReducers(fromCompletion.reducers);
    const completionState: fromCompletion.CompletionState = {
      addPlaying: {
        game: 'some cool game',
        platform: 'some awesome platform',
        startTime: 1523563
      },
      markComplete: {
        ids: ['1'],
        entities: {
          '1': {
            id: '1',
            showExtra: false,
            endTime: 10000
          }
        }
      },
      tab: {
        tab: 'COMPLETED'
      }
    };

    const clearedReducer = clearState(actionReducer);
    const result = clearedReducer(completionState, action);

    expect(result).toEqual({
      addPlaying: completion.initialAddPlayingState,
      markComplete: completion.initialMarkCompleteState,
      tab: completion.initialTabState
    });
  });

  it('Should clear dashboard state when Logout is dispatched', () => {
    const actionReducer = combineReducers(fromDashboard.reducers);

    const startThisWeek = startOfWeek(new Date());
    const endLastWeek = subDays(startThisWeek, 1);
    const startLastWeek = startOfWeek(endLastWeek);
    const dashboardState: fromDashboard.DashboardState = {
      dateRange: {
        startDay: startLastWeek,
        endDay: endLastWeek,
        type: 'LAST_WEEK'
      }
    };

    const clearedReducer = clearState(actionReducer);
    const result = clearedReducer(dashboardState, action);

    expect(result).toEqual({
      dateRange: {
        startDay: startThisWeek,
        endDay: endOfWeek(startThisWeek),
        type: 'THIS_WEEK'
      }
    });
  });

  it('Should clear profile state when Logout is dispatched', () => {
    const actionReducer = combineReducers(fromProfile.reducers);
    const profileState: fromProfile.ProfileState = {
      info: {
        displayName: 'some name'
      }
    };

    const clearedReducer = clearState(actionReducer);
    const result = clearedReducer(profileState, action);

    expect(result).toEqual({
      info: {
        displayName: ''
      }
    });
  });

  it('Should clear tracker state when Logout is dispatched', () => {
    const actionReducer = combineReducers(fromTracker.reducers);
    const trackerState: fromTracker.TrackerState = {
      display: {
        entriesToShow: 50
      }
    };

    const clearedReducer = clearState(actionReducer);
    const result = clearedReducer(trackerState, action);

    expect(result).toEqual({
      display: {
        entriesToShow: 4
      }
    });
  });

  it('Should clear root state when Logout is dispatched', () => {
    const actionReducer = combineReducers(fromRoot.reducers);
    const rootState: fromRoot.State = {
      error: {
        action: 'some action',
        message: 'some message'
      },
      router: {
        state: {
          url: 'some url',
          params: { 'returnLocation': 'something' },
          queryParams: { 'id': 'some id' }
        },
        navigationId: 10
      }
    };

    const clearedReducer = clearState(actionReducer);
    const result = clearedReducer(rootState, action);

    expect(result).toEqual({
      error: {
        action: '',
        message: ''
      },
      router: undefined
    });
  });

  it('Should clear shared state when Logout is dispatched', () => {
    const actionReducer = combineReducers(fromShared.reducers);
    const sharedState: fromShared.SharedState = {
      history: {
        ids: ['1', '2'],
        entities: {
          '1': {
            id: '1',
            game: 'some game',
            platform: 'some platform',
            startTime: 0,
            endTime: 1000
          },
          '2': {
            id: '2',
            game: 'some other game',
            platform: 'some other platform',
            startTime: 1000,
            endTime: 2000
          }
        },
        loading: true
      },
      platforms: {
        options: ['platform 1', 'platform 2']
      },
      progress: {
        ids: ['1', '2'],
        entities: {
          '1': {
            id: '1',
            startEntryId: 'start 1',
            endEntryId: 'end 1',
            notes: ''
          },
          '2': {
            id: '2',
            startEntryId: 'start 2',
            endEntryId: 'end 2',
            notes: ''
          }
        },
        loading: true
      },
      timer: {
        game: 'some game',
        platform: 'some platform',
        startTime: 123142
      }
    };

    const clearedReducer = clearState(actionReducer);
    const result = clearedReducer(sharedState, action);

    expect(result).toEqual({
      history: history.initialHistoryState,
      platforms: platforms.initialPlatformsState,
      progress: progress.initialProgressState,
      timer: tracker.initialTimerState
    });
  });
});
