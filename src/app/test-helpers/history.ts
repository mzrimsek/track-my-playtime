import { Observable } from 'rxjs/Observable';

import { FirestoreHistoryItem } from '../features/tracker/services/history.service';

import { HistoryEntity } from '../shared/reducers/history.reducer';

import { AddTimerInfo } from '../features/tracker/models';
import {
    HistoryGrouping, HistoryListItem, UpdateHistoryItemGamePayload,
    UpdateHistoryItemPlatformPayload, UpdateHistoryItemTimesPayload
} from '../shared/models';

export namespace history {
  export const getHistoryListItem = (game: string, platform = 'some platform', startTime = 0, endTime = 0): HistoryListItem => {
    return <HistoryListItem>{
      id: 'totally a unique id',
      game,
      platform,
      startTime,
      endTime,
      dateRange: [new Date(startTime), new Date(endTime)],
      locked: false
    };
  };

  export const getHistoryGrouping = (key: string, totalTime: number): HistoryGrouping => {
    return {
      key,
      totalTime,
      historyItems: []
    };
  };

  export const getHistoryEntity = (id: string): HistoryEntity => {
    return {
      id,
      game: 'some cool game',
      platform: 'some awesome platform',
      startTime: 12,
      endTime: 83
    };
  };

  export const testGame = 'Game 1';

  export const testGroupings: HistoryGrouping[] = [{
    key: testGame,
    historyItems: [{
      id: '4',
      game: testGame,
      platform: 'Platform 1',
      startTime: 8000,
      endTime: 9000,
      dateRange: [new Date(8000), new Date(9000)],
      locked: false
    }, {
      id: '3',
      game: testGame,
      platform: 'Platform 1',
      startTime: 5000,
      endTime: 6000,
      dateRange: [new Date(5000), new Date(6000)],
      locked: false
    }, {
      id: '2',
      game: testGame,
      platform: 'Platform 1',
      startTime: 3000,
      endTime: 4000,
      dateRange: [new Date(3000), new Date(4000)],
      locked: false
    }, {
      id: '1',
      game: testGame,
      platform: 'Platform 2',
      startTime: 1000,
      endTime: 2000,
      dateRange: [new Date(1000), new Date(2000)],
      locked: false
    }],
    totalTime: 4
  }];

  export const mockEntity: HistoryEntity = {
    id: '1',
    game: 'some game',
    platform: 'some platform',
    startTime: 3000,
    endTime: 6000
  };

  export class MockHistoryService {
    saveTimerInfo(_info: AddTimerInfo): Observable<HistoryEntity> {
      return Observable.of(mockEntity);
    }

    getHistoryList(_userId: string): Observable<HistoryEntity[]> {
      return Observable.of([mockEntity]);
    }

    deleteHistoryItem(_userId: string, itemId: string): Observable<string> {
      return Observable.of(itemId);
    }

    updateGame(_userId: string, payload: UpdateHistoryItemGamePayload): Observable<UpdateHistoryItemGamePayload> {
      return Observable.of(payload);
    }

    updatePlatform(_userId: string, payload: UpdateHistoryItemPlatformPayload): Observable<UpdateHistoryItemPlatformPayload> {
      return Observable.of(payload);
    }

    updateElapsedTime(_userId: string, payload: UpdateHistoryItemTimesPayload): Observable<UpdateHistoryItemTimesPayload> {
      return Observable.of(payload);
    }
  }

  export namespace firestore {
    export const testHistoryItems: FirestoreHistoryItem[] = [];

    export const itemDocumentStub = {
      set: jasmine.createSpy('set'),
      update: jasmine.createSpy('update'),
      delete: jasmine.createSpy('delete')
    };

    export const itemsCollectionStub = {
      doc: jasmine.createSpy('doc').and.returnValue(itemDocumentStub),
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(Observable.of(testHistoryItems))
    };

    export const documentStub = {
      collection: jasmine.createSpy('collection').and.returnValue(itemsCollectionStub)
    };

    export const collectionStub = {
      doc: jasmine.createSpy('doc').and.returnValue(documentStub)
    };

    export const angularFirestoreStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };
  }
}