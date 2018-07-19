import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AddPlayingEffects } from './add-playing.effects';

import { ProgressService } from '../services/progress.service';

import * as appActions from '../../../actions/app.actions';
import * as addPlayingActions from '../actions/add-playing.actions';

import { ProgressEntity } from '../../../shared/reducers/progress.reducer';

import { AddPlaying } from '../models';

describe('Add Playing Effects', () => {
  let actions: any;
  let effects: AddPlayingEffects;
  let progressService: ProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddPlayingEffects,
        provideMockActions(() => actions),
        { provide: ProgressService, useClass: MockProgressService }
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
        b: new addPlayingActions.SaveSucceeded(mockItem),
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

      spyOn(progressService, 'saveAddPlaying').and.callFake(() => Observable.throw({ message }));
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

const mockItem: ProgressEntity = {
  id: 'some id',
  startEntryId: 'some start id',
  endEntryId: 'some end id'
};

class MockProgressService {
  saveAddPlaying(_addPlaying: AddPlaying): Observable<ProgressEntity> {
    return Observable.of(mockItem);
  }
}
