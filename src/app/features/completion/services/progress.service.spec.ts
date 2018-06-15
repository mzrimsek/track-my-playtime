import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { FirestoreProgressItem, ProgressService } from './progress.service';

import { AddPlaying, MarkCompletePayload } from '../models';

describe('ProgressService', () => {
  let service: ProgressService;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgressService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }]
    });

    service = TestBed.get(ProgressService);
    afs = TestBed.get(AngularFirestore);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call AngularFirestore collection with "progress"', () => {
    expect(afs.collection).toHaveBeenCalledWith('progress');
  });

  describe('getProgressList', () => {
    afterEach(() => {
      while (testProgressItems.length > 0) {
        testProgressItems.pop();
      }
    });

    it('Should call progress collection doc with user id', () => {
      const userId = 'user id';
      service.getProgressList(userId);
      expect(progressCollectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call history document collection "items"', () => {
      service.getProgressList('');
      expect(progressDocumentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should return empty list when no data', () => {
      const result = service.getProgressList('');
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return correct data', () => {
      testProgressItems.push({
        id: '1',
        startEntryId: 'start id 1',
        endEntryId: ''
      }, {
          id: '2',
          startEntryId: 'start id 2',
          endEntryId: 'end id 1'
        });

      const result = service.getProgressList('');
      result.subscribe(res => {
        expect(res).toEqual([{
          id: '1',
          startEntryId: 'start id 1',
          endEntryId: ''
        }, {
          id: '2',
          startEntryId: 'start id 2',
          endEntryId: 'end id 1'
        }]);
      });
    });
  });

  describe('saveAddPlaying', () => {
    const addPlaying: AddPlaying = {
      userId: 'user id',
      startEntryId: 'start entry id'
    };

    const newItem: FirestoreProgressItem = {
      id: 'some id',
      startEntryId: addPlaying.startEntryId,
      endEntryId: ''
    };

    it('Should call history collection doc with item user id', () => {
      service.saveAddPlaying(addPlaying);
      expect(progressCollectionStub.doc).toHaveBeenCalledWith(addPlaying.userId);
    });

    it('Should call history document collection with "items"', () => {
      service.saveAddPlaying(addPlaying);
      expect(progressDocumentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with item id', () => {
      spyOn(service, 'getNewProgressItem').and.callFake(() => newItem);
      service.saveAddPlaying(addPlaying);
      expect(itemsCollectionStub.doc).toHaveBeenCalledWith(newItem.id);
    });

    it('Should call item collection doc set with correct info', () => {
      spyOn(service, 'getNewProgressItem').and.callFake(() => newItem);
      service.saveAddPlaying(addPlaying);
      expect(itemDocumentStub.set).toHaveBeenCalledWith(newItem);
    });

    it('Should return correct data', () => {
      spyOn(service, 'getNewProgressItem').and.callFake(() => newItem);
      const result = service.saveAddPlaying(addPlaying);
      result.subscribe(res => {
        expect(res).toEqual({
          id: newItem.id,
          startEntryId: newItem.startEntryId,
          endEntryId: ''
        });
      });
    });
  });

  describe('markCompleted', () => {
    const payload: MarkCompletePayload = {
      itemId: 'some item id',
      endEntryId: 'some end entry id'
    };

    it('Should call progress collection doc with user id', () => {
      const userId = 'user id';
      service.markCompleted(userId, payload);
      expect(progressCollectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call progress document collection with "items"', () => {
      service.markCompleted('', payload);
      expect(progressDocumentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with payload item id', () => {
      service.markCompleted('', payload);
      expect(itemsCollectionStub.doc).toHaveBeenCalledWith(payload.itemId);
    });

    it('Should call item document update with correct end entry id', () => {
      service.markCompleted('', payload);
      expect(itemDocumentStub.update).toHaveBeenCalledWith({ endEntryId: payload.endEntryId });
    });

    it('Should return correct data', () => {
      const result = service.markCompleted('', payload);
      result.subscribe(res => {
        expect(res).toEqual(payload);
      });
    });
  });

  describe('Remove', () => {
    it('Should call progress collection doc with user id', () => {
      const userId = 'user id';
      service.remove(userId, '');
      expect(progressCollectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call progress document collection with "items"', () => {
      service.remove('', '');
      expect(progressDocumentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with item id', () => {
      const itemId = 'some item id';
      service.remove('', itemId);
      expect(itemsCollectionStub.doc).toHaveBeenCalledWith(itemId);
    });

    it('Should call item document delete', () => {
      service.remove('', '');
      expect(itemDocumentStub.delete).toHaveBeenCalled();
    });

    it('Should return correct data', () => {
      const itemId = 'some item id';
      const result = service.remove('', itemId);
      result.subscribe(res => {
        expect(res).toBe(itemId);
      });
    });
  });
});

const testProgressItems: FirestoreProgressItem[] = [];

const itemDocumentStub = {
  set: jasmine.createSpy('set'),
  update: jasmine.createSpy('update'),
  delete: jasmine.createSpy('delete')
};

const itemsCollectionStub = {
  doc: jasmine.createSpy('doc').and.returnValue(itemDocumentStub),
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(Observable.of(testProgressItems))
};

const progressDocumentStub = {
  collection: jasmine.createSpy('collection').and.returnValue(itemsCollectionStub)
};

const progressCollectionStub = {
  doc: jasmine.createSpy('doc').and.returnValue(progressDocumentStub)
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(progressCollectionStub)
};
