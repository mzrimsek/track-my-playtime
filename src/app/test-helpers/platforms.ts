import { Observable } from 'rxjs/Observable';

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
}
