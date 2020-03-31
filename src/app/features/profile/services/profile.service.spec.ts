import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { profile } from 'app/test-helpers/profile';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService,
        { provide: AngularFirestore, useValue: profile.firestore.angularFirestoreStub }]
    });

    service = TestBed.get(ProfileService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProfile', () => {
    it('Should call collection doc with user id', () => {
      const userId = 'userId';
      service.getProfile(userId);
      expect(profile.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should return correct data', () => {
      const result = service.getProfile('');
      result.subscribe(res => {
        expect(res).toEqual(profile.profileWithDisplayName);
      });
    });
  });

  describe('setDisplayName', () => {
    const displayName = 'some name';

    it('Should call profile collection doc with user id', () => {
      const userId = 'user id';
      service.setDisplayName(userId, displayName);
      expect(profile.firestore.collectionStub.doc).toHaveBeenCalledWith(userId);
    });

    it('Should call document set with correct display name', () => {
      service.setDisplayName('', displayName);
      expect(profile.firestore.documentStub.set).toHaveBeenCalledWith({ displayName }, { merge: true });
    });

    it('Should return correct data', () => {
      const result = service.setDisplayName('', displayName);
      result.subscribe(res => {
        expect(res).toBe(displayName);
      });
    });
  });
});
