import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { ReplaySubject, throwError } from 'rxjs';

import { AddPlayingEffects } from './add-playing.effects';

import { ProgressService } from '../services/progress.service';

import * as appActions from '../../../actions/app.actions';
import * as addPlayingActions from '../actions/add-playing.actions';

import { progress } from '../../../test-helpers';

describe('Add Playing Effects', () => {
  let actions: any;
  let effects: AddPlayingEffects;
  let progressService: ProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddPlayingEffects,
        provideMockActions(() => actions),
        { provide: ProgressService, useClass: progress.MockProgressService }
      ]
    });

    effects = TestBed.get(AddPlayingEffects);
    progressService = TestBed.get(ProgressService);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Save', () => {
    it('Should dispatch SaveSucceeded and ResetTimer', () => {
      const action = new addPlayingActions.Save({
        userId: 'some user id',
        startEntryId: 'some start id'
      });

      actions = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: new addPlayingActions.SaveSucceeded(progress.mockItem),
        c: new addPlayingActions.Reset()
      });

      expect(effects.save$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new addPlayingActions.Save({
        userId: 'some user id',
        startEntryId: 'some start id'
      });
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(addPlayingActions.SAVE, message)
      });

      spyOn(progressService, 'saveAddPlaying').and.callFake(() => throwError({ message }));
      expect(effects.save$).toBeObservable(expected);
    });

    it('Should call progressService saveAddPlaying', () => {
      const action = new addPlayingActions.Save({
        userId: 'some user id',
        startEntryId: 'some start id'
      });

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(progressService, 'saveAddPlaying').and.callThrough();
      effects.save$.subscribe(() => {
        expect(progressService.saveAddPlaying).toHaveBeenCalled();
      });
    });
  });
});
