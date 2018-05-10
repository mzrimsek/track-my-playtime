import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { FirestoreTimerItem, TimerService } from './timer.service';

import { TimerInfo } from '../models';

describe('Timer Service', () => {
  let service: TimerService;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimerService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });

    service = TestBed.get(TimerService);
    afs = TestBed.get(AngularFirestore);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call AngularFirestore collection with "timer"', () => {
    expect(afs.collection).toHaveBeenCalledWith('timer');
  });

  describe('setTimer', () => {
    const newTimerInfo: TimerInfo = {
      game: 'some game',
      platform: 'some platform',
      startTime: 1000
    };

    it('Should call collection doc with user id', () => {
      const userId = 'user id';
      service.setTimer(userId, newTimerInfo);
      expect(collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with correct info', () => {
      service.setTimer('', newTimerInfo);
      expect(documentStub.set).toHaveBeenCalledWith(newTimerInfo);
    });
  });

  describe('setGame', () => {
    const game = 'a different game';

    it('Should call collection doc with user id', () => {
      const userId = 'user id';
      service.setGame(userId, game);
      expect(collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with correct game', () => {
      service.setGame('', game);
      expect(documentStub.set).toHaveBeenCalledWith({ game }, { merge: true });
    });
  });

  describe('setPlatform', () => {
    const platform = 'a different platform';

    it('Should call collection doc with user id', () => {
      const userId = 'user id';
      service.setPlatform(userId, platform);
      expect(collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with correct platform', () => {
      service.setPlatform('', platform);
      expect(documentStub.set).toHaveBeenCalledWith({ platform }, { merge: true });
    });
  });

  describe('setStartTime', () => {
    const startTime = 10000;

    it('Should call collection doc with user id', () => {
      const userId = 'user id';
      service.setStartTime(userId, startTime);
      expect(collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with correct startTime', () => {
      service.setStartTime('', startTime);
      expect(documentStub.set).toHaveBeenCalledWith({ startTime }, { merge: true });
    });
  });

  describe('resetTimer', () => {
    it('Should call collection doc with user id', () => {
      const userId = 'user id';
      service.resetTimer(userId);
      expect(collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with default info', () => {
      service.resetTimer('');
      expect(documentStub.set).toHaveBeenCalledWith({
        game: '',
        platform: '',
        startTime: 0
      });
    });
  });

  describe('getTimerInfo', () => {
    it('Should call collection doc with user id', () => {
      const userId = 'user id';
      service.getTimerInfo(userId);
      expect(collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should return correct data', () => {
      const result = service.getTimerInfo('');
      result.subscribe(res => {
        expect(res).toEqual(testTimerItem);
      });
    });
  });
});

const testTimerItem: FirestoreTimerItem = {
  game: 'some game',
  platform: 'some platform',
  startTime: 3000
};

const documentStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(Observable.of(testTimerItem)),
  set: jasmine.createSpy('set')
};

const collectionStub = {
  doc: jasmine.createSpy('doc').and.returnValue(documentStub)
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};
