import { Observable } from 'rxjs/Observable';

import { FirestoreProgressItem } from '../features/completion/services/progress.service';

import { ProgressEntity } from '../shared/reducers/progress.reducer';

import { AddPlaying } from '../features/completion/models';
import { MarkCompletePayload } from '../shared/models';

export namespace progress {
  export const mockItem: ProgressEntity = {
    id: 'some id',
    startEntryId: 'some start id',
    endEntryId: 'some end id'
  };

  export const mockItemNoEnd: ProgressEntity = {
    id: 'some id 2',
    startEntryId: 'some start id 2',
    endEntryId: ''
  };

  export class MockProgressService {
    saveAddPlaying(_addPlaying: AddPlaying): Observable<ProgressEntity> {
      return Observable.of(mockItem);
    }
    getProgressList(_userId: string): Observable<ProgressEntity[]> {
      return Observable.of([mockItem, mockItemNoEnd]);
    }
    remove(_userId: string, itemId: string): Observable<string> {
      return Observable.of(itemId);
    }
    markCompleted(_userId: string, payload: MarkCompletePayload): Observable<MarkCompletePayload> {
      return Observable.of(payload);
    }
  }

  export const getProgressEntity = (id: string, endEntryId = ''): ProgressEntity => {
    return {
      id,
      startEntryId: 'start entry id',
      endEntryId
    };
  };

  export namespace firestore {
    export const testProgressItems: FirestoreProgressItem[] = [];

    export const itemDocumentStub = {
      set: jasmine.createSpy('set'),
      update: jasmine.createSpy('update'),
      delete: jasmine.createSpy('delete')
    };

    export const itemsCollectionStub = {
      doc: jasmine.createSpy('doc').and.returnValue(itemDocumentStub),
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(Observable.of(testProgressItems))
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