import { Observable, of } from 'rxjs';

import { FirestorePlatformsItem } from '../features/tracker/services/platforms.service';

import { State as PlatformsState } from '../shared/reducers/platforms.reducer';

export namespace platforms {
  export const testPlatforms = [
    'PS4',
    'Xbox One'
  ];

  export class MockPlatformsService {
    getPlatformsOptions(): Observable<string[]> {
      return of(testPlatforms);
    }
  }

  export const initialPlatformsState: PlatformsState = {
    options: []
  };

  export namespace firestore {
    export const testPlatformsItems: FirestorePlatformsItem[] = [];

    export const collectionStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(testPlatformsItems))
    };

    export const angularFirestoreStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };
  }
}
