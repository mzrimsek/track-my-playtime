import { Observable } from 'rxjs/Observable';

import { FirestorePlatformsItem } from '../features/tracker/services/platforms.service';

export namespace platforms {
  export const testPlatforms = [
    'PS4',
    'Xbox One'
  ];

  export class MockPlatformsService {
    getPlatformsOptions(): Observable<string[]> {
      return Observable.of(testPlatforms);
    }
  }

  export namespace firestore {
    export const testPlatformsItems: FirestorePlatformsItem[] = [];

    export const collectionStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(Observable.of(testPlatformsItems))
    };

    export const angularFirestoreStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };
  }
}
