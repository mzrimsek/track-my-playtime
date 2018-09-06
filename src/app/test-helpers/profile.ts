import { Observable, of } from 'rxjs';

import { Profile } from '../features/profile/models';

export namespace profile {
  export const profileWithDisplayName: Profile = {
    displayName: 'profile name'
  };

  export const profileWithoutDisplayName: Profile = {
    displayName: ''
  };

  export class MockProfileService {
    getProfile(_userId: string): Observable<Profile> {
      return of(profileWithDisplayName);
    }

    setDisplayName(_userId: string, displayName: string): Observable<string> {
      return of(displayName);
    }
  }

  export namespace firestore {
    export const documentStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(profileWithDisplayName)),
      set: jasmine.createSpy('set')
    };

    export const collectionStub = {
      doc: jasmine.createSpy('doc').and.returnValue(documentStub)
    };

    export const angularFirestoreStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };
  }
}
