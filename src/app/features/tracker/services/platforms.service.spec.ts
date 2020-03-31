import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { platforms } from 'app/test-helpers';

import { PlatformsService } from './platforms.service';

describe('Platforms Service', () => {
  let service: PlatformsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformsService,
        { provide: AngularFirestore, useValue: platforms.firestore.angularFirestoreStub }
      ]
    });

    service = TestBed.get(PlatformsService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPlatformsOptions', () => {
    afterEach(() => {
      while (platforms.firestore.testPlatformsItems.length > 0) {
        platforms.firestore.testPlatformsItems.pop();
      }
    });

    it('Should return empty list when no data', () => {
      const result = service.getPlatformsOptions();
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return correct data', () => {
      platforms.firestore.testPlatformsItems.push({
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
