import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { FirestoreHistoryItem, HistoryService } from './history.service';

import {
    UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload, UpdateHistoryItemTimesPayload
} from '../../../shared/models';
import { AddTimerInfo } from '../models';

describe('History Service', () => {
  let service: HistoryService;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HistoryService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });

    service = TestBed.get(HistoryService);
    afs = TestBed.get(AngularFirestore);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call AngularFirestore collection with "history"', () => {
    expect(afs.collection).toHaveBeenCalledWith('history');
  });

  describe('getHistoryList', () => {
    afterEach(() => {
      while (testHistoryItems.length > 0) {
        testHistoryItems.pop();
      }
    });

    it('Should call history collection doc with user id', () => {
      const userId = 'user id';
      service.getHistoryList(userId);
      expect(historyCollectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call history document collection with "items"', () => {
      service.getHistoryList('');
      expect(historyDocumentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should return empty list when no data', () => {
      const result = service.getHistoryList('');
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return correct data', () => {
      testHistoryItems.push({
        id: '1',
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 6000,
        source: 'web'
      }, {
          id: '2',
          game: 'some other game',
          platform: 'some platform',
          startTime: 30000,
          endTime: 60000,
          source: 'web'
        });

      const result = service.getHistoryList('');
      result.subscribe(res => {
        expect(res).toEqual([{
          id: '1',
          game: 'some game',
          platform: 'some platform',
          startTime: 3000,
          endTime: 6000
        }, {
          id: '2',
          game: 'some other game',
          platform: 'some platform',
          startTime: 30000,
          endTime: 60000
        }]);
      });
    });
  });

  describe('saveTimerInfo', () => {
    const info: AddTimerInfo = {
      userId: 'user id',
      game: 'some game',
      platform: 'some platform',
      startTime: 3000,
      endTime: 6000
    };

    const newItem: FirestoreHistoryItem = {
      id: 'some id',
      game: info.game,
      platform: info.platform,
      startTime: info.startTime,
      endTime: info.endTime,
      source: 'web'
    };

    it('Should call history collection doc with item user id', () => {
      service.saveTimerInfo(info);
      expect(historyCollectionStub.doc).toHaveBeenCalledWith(info.userId);
    });

    it('Should call history document collection with "items"', () => {
      service.saveTimerInfo(info);
      expect(historyDocumentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with item id', () => {
      spyOn(service, 'getNewHistoryItem').and.callFake(() => newItem);
      service.saveTimerInfo(info);
      expect(itemsCollectionStub.doc).toHaveBeenCalledWith(newItem.id);
    });

    it('Should call item collection doc set with correct info', () => {
      spyOn(service, 'getNewHistoryItem').and.callFake(() => newItem);
      service.saveTimerInfo(info);
      expect(itemDocumentStub.set).toHaveBeenCalledWith(newItem);
    });

    it('Should return correct data', () => {
      spyOn(service, 'getNewHistoryItem').and.callFake(() => newItem);
      const result = service.saveTimerInfo(info);
      result.subscribe(res => {
        expect(res).toEqual({
          id: newItem.id,
          game: newItem.game,
          platform: newItem.platform,
          startTime: newItem.startTime,
          endTime: newItem.endTime
        });
      });
    });
  });

  describe('deleteHistoryItem', () => {
    it('Should call history collection doc with user id', () => {
      const userId = 'user id';
      service.deleteHistoryItem(userId, '');
      expect(historyCollectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call history document collection with "items"', () => {
      service.deleteHistoryItem('', '');
      expect(historyDocumentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with item id', () => {
      const itemId = 'some item id';
      service.deleteHistoryItem('', itemId);
      expect(itemsCollectionStub.doc).toHaveBeenCalledWith(itemId);
    });

    it('Should call item document delete', () => {
      service.deleteHistoryItem('', '');
      expect(itemDocumentStub.delete).toHaveBeenCalled();
    });

    it('Should return correct data', () => {
      const itemId = 'some item id';
      const result = service.deleteHistoryItem('', itemId);
      result.subscribe(res => {
        expect(res).toBe(itemId);
      });
    });
  });

  describe('updateGame', () => {
    const payload: UpdateHistoryItemGamePayload = {
      itemId: 'some item id',
      game: 'some game'
    };

    it('Should call history collection doc with user id', () => {
      const userId = 'user id';
      service.updateGame(userId, payload);
      expect(historyCollectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call history document collection with "items"', () => {
      service.updateGame('', payload);
      expect(historyDocumentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with payload item id', () => {
      service.updateGame('', payload);
      expect(itemsCollectionStub.doc).toHaveBeenCalledWith(payload.itemId);
    });

    it('Should call item document update with correct game', () => {
      service.updateGame('', payload);
      expect(itemDocumentStub.update).toHaveBeenCalledWith({ game: payload.game });
    });
  });

  describe('updatePlatform', () => {
    const payload: UpdateHistoryItemPlatformPayload = {
      itemId: 'some item id',
      platform: 'some platform'
    };

    it('Should call history collection doc with user id', () => {
      const userId = 'user id';
      service.updatePlatform(userId, payload);
      expect(historyCollectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call history document collection with "items"', () => {
      service.updatePlatform('', payload);
      expect(historyDocumentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with payload item id', () => {
      service.updatePlatform('', payload);
      expect(itemsCollectionStub.doc).toHaveBeenCalledWith(payload.itemId);
    });

    it('Should call item document update with correct platform', () => {
      service.updatePlatform('', payload);
      expect(itemDocumentStub.update).toHaveBeenCalledWith({ platform: payload.platform });
    });
  });

  describe('updateElapsedTime', () => {
    const payload: UpdateHistoryItemTimesPayload = {
      itemId: 'some item id',
      startTime: 3000,
      endTime: 6000
    };

    it('Should call history collection doc with user id', () => {
      const userId = 'user id';
      service.updateElapsedTime(userId, payload);
      expect(historyCollectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call history document collection with "items"', () => {
      service.updateElapsedTime('', payload);
      expect(historyDocumentStub.collection).toHaveBeenCalledWith('items');
    });

    it('Should call item collection doc with payload item id', () => {
      service.updateElapsedTime('', payload);
      expect(itemsCollectionStub.doc).toHaveBeenCalledWith(payload.itemId);
    });

    it('Should call item document update with correct startTime and endTime', () => {
      service.updateElapsedTime('', payload);
      expect(itemDocumentStub.update).toHaveBeenCalledWith({
        startTime: payload.startTime,
        endTime: payload.endTime
      });
    });
  });
});

const testHistoryItems: FirestoreHistoryItem[] = [];

const itemDocumentStub = {
  set: jasmine.createSpy('set'),
  update: jasmine.createSpy('update'),
  delete: jasmine.createSpy('delete')
};

const itemsCollectionStub = {
  doc: jasmine.createSpy('doc').and.returnValue(itemDocumentStub),
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(Observable.of(testHistoryItems))
};

const historyDocumentStub = {
  collection: jasmine.createSpy('collection').and.returnValue(itemsCollectionStub)
};

const historyCollectionStub = {
  doc: jasmine.createSpy('doc').and.returnValue(historyDocumentStub)
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(historyCollectionStub)
};
