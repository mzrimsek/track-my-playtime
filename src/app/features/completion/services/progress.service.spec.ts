import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { progress } from 'app/test-helpers';

import { FirestoreProgressItem, ProgressService } from './progress.service';

import { AddPlaying } from 'features/completion/models';
import { MarkCompletePayload, SetNotesPayload } from 'shared/models';

describe('ProgressService', () => {
  let service: ProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgressService,
        { provide: AngularFirestore, useValue: progress.firestore.angularFirestoreStub }]
    });

    service = TestBed.get(ProgressService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProgressList', () => {
    afterEach(() => {
      while (progress.firestore.testProgressItems.length > 0) {
        progress.firestore.testProgressItems.pop();
      }
    });

    it('Should call progress collection doc with user id', () => {
      const userId = 'user id';
      service.getProgressList(userId);
      expect(progress.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call history document collection "items"', () => {
      service.getProgressList('');
      expect(progress.firestore.documentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should return empty list when no data', () => {
      const result = service.getProgressList('');
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return correct data', () => {
      progress.firestore.testProgressItems.push({
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
          endEntryId: '',
          notes: ''
        }, {
          id: '2',
          startEntryId: 'start id 2',
          endEntryId: 'end id 1',
          notes: ''
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
      endEntryId: '',
      notes: ''
    };

    it('Should call history collection doc with item user id', () => {
      service.saveAddPlaying(addPlaying);
      expect(progress.firestore.collectionStub.doc).toHaveBeenCalledWith(addPlaying.userId);
    });

    it('Should call history document collection with "items"', () => {
      service.saveAddPlaying(addPlaying);
      expect(progress.firestore.documentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with item id', () => {
      spyOn(service, 'getNewProgressItem').and.callFake(() => newItem);
      service.saveAddPlaying(addPlaying);
      expect(progress.firestore.itemsCollectionStub.doc).toHaveBeenCalledWith(newItem.id);
    });

    it('Should call item collection doc set with correct info', () => {
      spyOn(service, 'getNewProgressItem').and.callFake(() => newItem);
      service.saveAddPlaying(addPlaying);
      expect(progress.firestore.itemDocumentStub.set).toHaveBeenCalledWith(newItem);
    });

    it('Should return correct data', () => {
      spyOn(service, 'getNewProgressItem').and.callFake(() => newItem);
      const result = service.saveAddPlaying(addPlaying);
      result.subscribe(res => {
        expect(res).toEqual({
          id: newItem.id,
          startEntryId: newItem.startEntryId,
          endEntryId: '',
          notes: ''
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
      expect(progress.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call progress document collection with "items"', () => {
      service.markCompleted('', payload);
      expect(progress.firestore.documentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with payload item id', () => {
      service.markCompleted('', payload);
      expect(progress.firestore.itemsCollectionStub.doc).toHaveBeenCalledWith(payload.itemId);
    });

    it('Should call item document update with correct end entry id', () => {
      service.markCompleted('', payload);
      expect(progress.firestore.itemDocumentStub.update).toHaveBeenCalledWith({ endEntryId: payload.endEntryId });
    });

    it('Should return correct data', () => {
      const result = service.markCompleted('', payload);
      result.subscribe(res => {
        expect(res).toEqual(payload);
      });
    });
  });

  describe('remove', () => {
    it('Should call progress collection doc with user id', () => {
      const userId = 'user id';
      service.remove(userId, '');
      expect(progress.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call progress document collection with "items"', () => {
      service.remove('', '');
      expect(progress.firestore.documentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with item id', () => {
      const itemId = 'some item id';
      service.remove('', itemId);
      expect(progress.firestore.itemsCollectionStub.doc).toHaveBeenCalledWith(itemId);
    });

    it('Should call item document delete', () => {
      service.remove('', '');
      expect(progress.firestore.itemDocumentStub.delete).toHaveBeenCalled();
    });

    it('Should return correct data', () => {
      const itemId = 'some item id';
      const result = service.remove('', itemId);
      result.subscribe(res => {
        expect(res).toBe(itemId);
      });
    });
  });

  describe('setNotes', () => {
    const payload: SetNotesPayload = {
      itemId: 'some item id',
      notes: 'some notes'
    };

    it('Should call progress collection doc with user id', () => {
      const userId = 'user id';
      service.setNotes(userId, payload);
      expect(progress.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call progress document collection with "items"', () => {
      service.setNotes('', payload);
      expect(progress.firestore.documentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with payload item id', () => {
      service.setNotes('', payload);
      expect(progress.firestore.itemsCollectionStub.doc).toHaveBeenCalledWith(payload.itemId);
    });

    it('Should call item document update with correct end entry id', () => {
      service.setNotes('', payload);
      expect(progress.firestore.itemDocumentStub.update).toHaveBeenCalledWith({ notes: payload.notes });
    });

    it('Should return correct data', () => {
      const result = service.setNotes('', payload);
      result.subscribe(res => {
        expect(res).toEqual(payload);
      });
    });
  });
});
