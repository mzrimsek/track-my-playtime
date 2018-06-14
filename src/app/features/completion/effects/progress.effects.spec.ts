import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ProgressEffects } from './progress.effects';

import { ProgressService } from '../services/progress.service';

import * as appActions from '../../../actions/app.actions';
import * as addPlayingActions from '../actions/add-playing.actions';
import * as progressActions from '../actions/progress.actions';

import { ProgressEntity } from '../reducers/progress.reducer';

describe('Progress Effects', () => {
  let actions: any;
  let effects: ProgressEffects;
  let progressService: ProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgressEffects,
        provideMockActions(() => actions),
        { provide: ProgressService, useClass: MockProgressService }
      ]
    });

    effects = TestBed.get(ProgressEffects);
    progressService = TestBed.get(ProgressService);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Load Progress Items', () => {
    it('Should dispatch LoadProgressItemsSucceeded', () => {
      const action = new progressActions.LoadProgressItems('some user id');

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new progressActions.LoadProgressItemsSucceeded([mockItem])
      });

      expect(effects.loadProgressItems$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new progressActions.LoadProgressItems('some user id');
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(progressActions.LOAD_PROGRESS_ITEMS, message)
      });

      spyOn(progressService, 'getProgressList').and.callFake(() => Observable.throw({ message }));
      expect(effects.loadProgressItems$).toBeObservable(expected);
    });

    it('Should call ProgressService getProgressList', () => {
      const action = new progressActions.LoadProgressItems('some user id');

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(progressService, 'getProgressList').and.callThrough();
      effects.loadProgressItems$.subscribe(() => {
        expect(progressService.getProgressList).toHaveBeenCalled();
      });
    });
  });

  describe('Save Add Playing Succeeded', () => {
    it('Should dispatch AddNewProgressItem', () => {
      const action = new addPlayingActions.SaveSucceeded(mockItem);

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new progressActions.AddNewProgressItem(mockItem)
      });

      expect(effects.saveAddPlayingSucceeded$).toBeObservable(expected);
    });
  });
});

const mockItem: ProgressEntity = {
  id: 'some id',
  startEntryId: 'some start id',
  endEntryId: 'some end id'
};

class MockProgressService {
  getProgressList(_userId: string): Observable<ProgressEntity[]> {
    return Observable.of([mockItem]);
  }
}
