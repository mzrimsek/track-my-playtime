import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import * as appActions from 'app/actions/app.actions';
import { platforms } from 'app/test-helpers';
import { cold, hot } from 'jasmine-marbles';
import { ReplaySubject, throwError } from 'rxjs';
import * as platformsActions from 'shared/actions/platforms.actions';

import { PlatformsService } from 'features/tracker/services/platforms.service';

import { PlatformsEffects } from './platforms.effects';

describe('Platforms Effects', () => {
  let actions: any;
  let effects: PlatformsEffects;
  let platformsService: PlatformsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformsEffects,
        provideMockActions(() => actions),
        { provide: PlatformsService, useClass: platforms.MockPlatformsService }
      ]
    });

    effects = TestBed.get(PlatformsEffects);
    platformsService = TestBed.get(PlatformsService);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Load Options', () => {
    it('Should dispatch LoadOptionsSucceeded', () => {
      const action = new platformsActions.LoadOptions();

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new platformsActions.LoadOptionsSucceeded(platforms.testPlatforms)
      });

      expect(effects.loadOptions$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new platformsActions.LoadOptions();
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(platformsActions.LOAD_OPTIONS, message)
      });

      spyOn(platformsService, 'getPlatformsOptions').and.callFake(() => throwError({ message }));
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
