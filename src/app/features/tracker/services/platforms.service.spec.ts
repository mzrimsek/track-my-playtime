import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { FirestorePlatformsItem, PlatformsService } from './platforms.service';

describe('Platforms Service', () => {
  let service: PlatformsService;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformsService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });

    service = TestBed.get(PlatformsService);
    afs = TestBed.get(AngularFirestore);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call AngularFirestore collection with "platforms"', () => {
    expect(afs.collection).toHaveBeenCalledWith('platforms');
  });

  describe('getPlatformsOptions', () => {
    afterEach(() => {
      while (testPlatformsItems.length > 0) {
        testPlatformsItems.pop();
      }
    });

    it('Should return empty list when no data', () => {
      const result = service.getPlatformsOptions();
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return correct data', () => {
      testPlatformsItems.push({
        index: 3,
        option: 'Platform 1'
      }, {
          index: 1,
          option: 'Platform 2'
        });

      const result = service.getPlatformsOptions();

      result.subscribe(res => {
        expect(res).toEqual(['Platform 2', 'Platform 1']);
      });
    });
  });
});

const testPlatformsItems: FirestorePlatformsItem[] = [];

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(Observable.of(testPlatformsItems))
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};
