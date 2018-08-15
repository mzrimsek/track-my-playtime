import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';

import { ProfileService } from './profile.service';

import { profile } from '../../../test-helpers/profile';

describe('ProfileService', () => {
  let service: ProfileService;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService,
        { provide: AngularFirestore, useValue: profile.firestore.angularFirestoreStub }]
    });

    service = TestBed.get(ProfileService);
    afs = TestBed.get(AngularFirestore);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call AngularFirestore collection with "profile"', () => {
    expect(afs.collection).toHaveBeenCalledWith('profile');
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
});
