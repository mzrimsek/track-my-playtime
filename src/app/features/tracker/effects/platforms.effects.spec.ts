import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import { PlatformsEffects } from './platforms.effects';

import { PlatformsService } from '../services/platforms.service';

import * as platformsActions from '../actions/platforms.actions';

import '../../../rxjs-operators';

describe('Platforms Effects', () => {
  let actions: any;
  let effects: PlatformsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformsEffects,
        provideMockActions(() => actions),
        { provide: PlatformsService, useClass: MockPlatformsService }
      ]
    });
    effects = TestBed.get(PlatformsEffects);
  });

  describe('Load Options', () => {
    it('Should dispatch LoadOptionsSucceeded', () => {
      const action = new platformsActions.LoadOptions();

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new platformsActions.LoadOptionsSucceeded(mockOptions)
      });

      expect(effects.loadOptions$).toBeObservable(expected);
    });

    it('Should call PlatformsService getPlatformsOptions', () => {
      fail();
    });
  });
});

const mockOptions = [
  'Game Box 720',
  'Nipkendo Scratch',
  'Dudestation 69'
];

class MockPlatformsService {
  getPlatformsOptions(): Observable<string[]> {
    return Observable.of(mockOptions);
  }
}
