import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ProgressEffects } from './progress.effects';

import { ProgressService } from '../services/progress.service';

import * as appActions from '../../../actions/app.actions';
import * as addPlayingActions from '../actions/add-playing.actions';
import * as markCompleteActions from '../actions/mark-complete.actions';
import * as progressActions from '../actions/progress.actions';

import { ProgressEntity } from '../reducers/progress.reducer';

import { MarkCompletePayload } from '../models';

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
    it('Should dispatch LoadProgressItemsSucceeded and LoadItems', () => {
      const action = new progressActions.LoadProgressItems('some user id');

      actions = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: new progressActions.LoadProgressItemsSucceeded([mockItem, mockItemNoEnd]),
        c: new markCompleteActions.LoadItems([mockItemNoEnd.id])
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
    it('Should dispatch AddNewProgressItem and AddNewItem', () => {
      const action = new addPlayingActions.SaveSucceeded(mockItem);

      actions = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: new progressActions.AddNewProgressItem(mockItem),
        c: new markCompleteActions.AddNewItem(mockItem.id)
      });

      expect(effects.saveAddPlayingSucceeded$).toBeObservable(expected);
    });
  });

  describe('Remove Progress Item', () => {
    it('Should dispatch RemoveProgressItemSucceeded and Remove', () => {
      const itemId = 'some item id';
      const action = new progressActions.RemoveProgressItem('some user id', itemId);

      actions = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: new progressActions.RemoveProgressItemSucceeded(itemId),
        c: new markCompleteActions.Remove(itemId)
      });

      expect(effects.removeProgressItem$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new progressActions.RemoveProgressItem('some user id', 'some item id');
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(progressActions.REMOVE_PROGRESS_ITEM, message)
      });

      spyOn(progressService, 'remove').and.callFake(() => Observable.throw({ message }));
      expect(effects.removeProgressItem$).toBeObservable(expected);
    });

    it('Should call ProgressService remove', () => {
      const action = new progressActions.RemoveProgressItem('some user id', 'some item id');

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(progressService, 'remove').and.callThrough();
      effects.removeProgressItem$.subscribe(() => {
        expect(progressService.remove).toHaveBeenCalled();
      });
    });
  });

  describe('Mark Completed', () => {
    it('Should dispatch MarkCompletedSucceeded', () => {
      const payload: MarkCompletePayload = {
        itemId: 'item id',
        endEntryId: 'end entry id'
      };
      const action = new progressActions.MarkComplete('some user id', payload);

      actions = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: new progressActions.MarkCompleteSucceeded(payload),
        c: new markCompleteActions.Remove(payload.itemId)
      });

      expect(effects.markCompleted$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new progressActions.MarkComplete('some user id', {
        itemId: 'item id',
        endEntryId: 'end entry id'
      });
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(progressActions.MARK_COMPLETE, message)
      });

      spyOn(progressService, 'markCompleted').and.callFake(() => Observable.throw({ message }));
      expect(effects.markCompleted$).toBeObservable(expected);
    });

    it('Should call ProgressService markCompleted', () => {
      const action = new progressActions.MarkComplete('some user id', {
        itemId: 'item id',
        endEntryId: 'end entry id'
      });

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(progressService, 'markCompleted').and.callThrough();
      effects.markCompleted$.subscribe(() => {
        expect(progressService.markCompleted).toHaveBeenCalled();
      });
    });
  });
});

const mockItem: ProgressEntity = {
  id: 'some id',
  startEntryId: 'some start id',
  endEntryId: 'some end id'
};

const mockItemNoEnd: ProgressEntity = {
  id: 'some id 2',
  startEntryId: 'some start id 2',
  endEntryId: ''
};

class MockProgressService {
  getProgressList(_userId: string): Observable<ProgressEntity[]> {
    return Observable.of([mockItem, mockItemNoEnd]);
  }
  remove(_userId: string, itemId: string): Observable<string> {
    return Observable.of(itemId);
  }
  markCompleted(_userId: string, payload: MarkCompletePayload): Observable<MarkCompletePayload> {
    return Observable.of(payload);
  }
}
