import { Observable, of } from 'rxjs';

import { FirestoreTimerItem } from '../features/tracker/services/timer.service';

import { State as TimerState } from '../shared/reducers/timer.reducer';

import { TimerInfo } from '../shared/models';

export namespace tracker {
  export const timerServiceStub = {
    setTimer: jasmine.createSpy('setTimer'),
    setGame: jasmine.createSpy('setGame'),
    setPlatform: jasmine.createSpy('setPlatform'),
    setStartTime: jasmine.createSpy('setStartTime'),
    resetTimer: jasmine.createSpy('resetTimer'),
    getNowTime: jasmine.createSpy('getNowTime')
  };

  export const elapsedTimeServiceStub = {
    getElapsedTime: jasmine.createSpy('getElapsedTime')
  };

  export const testInfo: TimerInfo = {
    game: 'some game',
    platform: 'some platform',
    startTime: 0
  };

  export const initialTimerState: TimerState = {
    game: '',
    platform: '',
    startTime: 0
  };

  export class MockTimerService {
    getTimerInfo(_userId: string): Observable<TimerInfo> {
      return of(testInfo);
    }
  }

  export class MockElapsedTimeService {
    getElapsedTime(invalidValue: string): Observable<string> {
      return of(invalidValue);
    }
  }

  export namespace firestore {
    export const testTimerItem: FirestoreTimerItem = {
      game: 'some game',
      platform: 'some platform',
      startTime: 3000
    };

    export const documentStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(testTimerItem)),
      set: jasmine.createSpy('set')
    };

    export const collectionStub = {
      doc: jasmine.createSpy('doc').and.returnValue(documentStub)
    };

    export const angularFirestoreStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };
  }
}
