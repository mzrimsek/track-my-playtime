import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { PlatformsEffects } from './platforms.effects';

import { PlatformsService } from '../services/platforms.service';

import * as platformsActions from '../actions/platforms.actions';

import '../../../rxjs-operators';

describe('Platforms Effects', () => {
  let actions: any;
  let effects: PlatformsEffects;
  let platformsService: PlatformsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformsEffects,
        provideMockActions(() => actions),
        { provide: PlatformsService, useClass: MockPlatformsService }
      ]
    });
    effects = TestBed.get(PlatformsEffects);
    platformsService = TestBed.get(PlatformsService);
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
      const action = new platformsActions.LoadOptions();

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(platformsService, 'getPlatformsOptions').and.callThrough();
      effects.loadOptions$.subscribe(() => {
        expect(platformsService.getPlatformsOptions).toHaveBeenCalled();
      });
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
