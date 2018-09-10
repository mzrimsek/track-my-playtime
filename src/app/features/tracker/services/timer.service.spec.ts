import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';

import { TimerService } from './timer.service';

import { TimerInfo } from '../../../shared/models';

import { tracker } from '../../../test-helpers';

describe('Timer Service', () => {
  let service: TimerService;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimerService,
        { provide: AngularFirestore, useValue: tracker.firestore.angularFirestoreStub }
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
      expect(tracker.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with correct info', () => {
      service.setTimer('', newTimerInfo);
      expect(tracker.firestore.documentStub.set).toHaveBeenCalledWith(newTimerInfo);
    });
  });

  describe('setGame', () => {
    const game = 'a different game';

    it('Should call collection doc with user id', () => {
      const userId = 'user id';
      service.setGame(userId, game);
      expect(tracker.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with correct game', () => {
      service.setGame('', game);
      expect(tracker.firestore.documentStub.set).toHaveBeenCalledWith({ game }, { merge: true });
    });
  });

  describe('setPlatform', () => {
    const platform = 'a different platform';

    it('Should call collection doc with user id', () => {
      const userId = 'user id';
      service.setPlatform(userId, platform);
      expect(tracker.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with correct platform', () => {
      service.setPlatform('', platform);
      expect(tracker.firestore.documentStub.set).toHaveBeenCalledWith({ platform }, { merge: true });
    });
  });

  describe('setStartTime', () => {
    const startTime = 10000;

    it('Should call collection doc with user id', () => {
      const userId = 'user id';
      service.setStartTime(userId, startTime);
      expect(tracker.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with correct startTime', () => {
      service.setStartTime('', startTime);
      expect(tracker.firestore.documentStub.set).toHaveBeenCalledWith({ startTime }, { merge: true });
    });
  });

  describe('resetTimer', () => {
    it('Should call collection doc with user id', () => {
      const userId = 'user id';
      service.resetTimer(userId);
      expect(tracker.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with default info', () => {
      service.resetTimer('');
      expect(tracker.firestore.documentStub.set).toHaveBeenCalledWith({
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
      expect(tracker.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should return correct data', () => {
      const result = service.getTimerInfo('');
      result.subscribe(res => {
        expect(res).toEqual(tracker.firestore.testTimerItem);
      });
    });
  });
});
