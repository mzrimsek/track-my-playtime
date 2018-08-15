import { Observable } from 'rxjs/Observable';

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
      return Observable.of(profileWithDisplayName);
    }
  }
}
