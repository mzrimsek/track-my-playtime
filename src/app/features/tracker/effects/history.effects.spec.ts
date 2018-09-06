import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { ReplaySubject, throwError } from 'rxjs';

import { HistoryEffects } from './history.effects';

import { HistoryService } from '../services/history.service';

import * as appActions from '../../../actions/app.actions';
import * as historyActions from '../../../shared/actions/history.actions';
import * as timerActions from '../actions/timer.actions';

import {
    UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload, UpdateHistoryItemTimesPayload
} from '../../../shared/models';

import { history } from '../../../test-helpers';

describe('History Effects', () => {
  let actions: any;
  let effects: HistoryEffects;
  let historyService: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HistoryEffects,
        provideMockActions(() => actions),
        { provide: HistoryService, useClass: history.MockHistoryService }
      ]
    });

    effects = TestBed.get(HistoryEffects);
    historyService = TestBed.get(HistoryService);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Load History Items', () => {
    it('Should dispatch LoadHistoryItemsSucceeded', () => {
      const action = new historyActions.LoadHistoryItems('some user id');

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new historyActions.LoadHistoryItemsSucceeded([history.mockEntity])
      });

      expect(effects.loadHistoryItems$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new historyActions.LoadHistoryItems('some user id');
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(historyActions.LOAD_HISTORY_ITEMS, message)
      });

      spyOn(historyService, 'getHistoryList').and.callFake(() => throwError({ message }));
      expect(effects.loadHistoryItems$).toBeObservable(expected);
    });

    it('Should call HistoryService getHistoryList', () => {
      const action = new historyActions.LoadHistoryItems('some user id');

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(historyService, 'getHistoryList').and.callThrough();
      effects.loadHistoryItems$.subscribe(() => {
        expect(historyService.getHistoryList).toHaveBeenCalled();
      });
    });
  });

  describe('Save Timer Info Succeeded', () => {
    it('Should dispatch AddNewHistoryItem', () => {
      const action = new timerActions.SaveTimerInfoSucceeded(history.mockEntity);

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new historyActions.AddNewHistoryItem(history.mockEntity)
      });

      expect(effects.saveTimerInfoSucceeded$).toBeObservable(expected);
    });
  });

  describe('Remove History Item', () => {
    it('Should dispatch RemoveHistoryItemSucceeded', () => {
      const itemId = 'some item id';
      const action = new historyActions.RemoveHistoryItem('some user id', itemId);

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new historyActions.RemoveHistoryItemSucceeded(itemId)
      });

      expect(effects.removeHistoryItem$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new historyActions.RemoveHistoryItem('some user id', 'some item id');
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(historyActions.REMOVE_HISTORY_ITEM, message)
      });

      spyOn(historyService, 'deleteHistoryItem').and.callFake(() => throwError({ message }));
      expect(effects.removeHistoryItem$).toBeObservable(expected);
    });

    it('Should call HistoryService deleteHistoryItem', () => {
      const action = new historyActions.RemoveHistoryItem('some user id', 'some item id');

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(historyService, 'deleteHistoryItem').and.callThrough();
      effects.removeHistoryItem$.subscribe(() => {
        expect(historyService.deleteHistoryItem).toHaveBeenCalled();
      });
    });
  });

  describe('Update Game', () => {
    it('Should dispatch UpdateGameSucceeded', () => {
      const payload: UpdateHistoryItemGamePayload = {
        itemId: '1',
        game: 'new game'
      };
      const action = new historyActions.UpdateGame('some user id', payload);

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new historyActions.UpdateGameSucceeded(payload)
      });

      expect(effects.updateGame$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new historyActions.UpdateGame('some user id', {
        itemId: '1',
        game: 'new game'
      });
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(historyActions.UPDATE_GAME, message)
      });

      spyOn(historyService, 'updateGame').and.callFake(() => throwError({ message }));
      expect(effects.updateGame$).toBeObservable(expected);
    });

    it('Should call HistoryService updateGame', () => {
      const action = new historyActions.UpdateGame('some user id', {
        itemId: '1',
        game: 'new game'
      });

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(historyService, 'updateGame').and.callThrough();
      effects.updateGame$.subscribe(() => {
        expect(historyService.updateGame).toHaveBeenCalled();
      });
    });
  });

  describe('Update Platform', () => {
    it('Should dispatch UpdatePlatformSucceeded', () => {
      const payload: UpdateHistoryItemPlatformPayload = {
        itemId: '1',
        platform: 'new platform'
      };
      const action = new historyActions.UpdatePlatform('some user id', payload);

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new historyActions.UpdatePlatformSucceeded(payload)
      });

      expect(effects.updatePlatform$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new historyActions.UpdatePlatform('some user id', {
        itemId: '1',
        platform: 'new platform'
      });
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(historyActions.UPDATE_PLATFORM, message)
      });

      spyOn(historyService, 'updatePlatform').and.callFake(() => throwError({ message }));
      expect(effects.updatePlatform$).toBeObservable(expected);
    });

    it('Should call HistoryService updatePlatform', () => {
      const action = new historyActions.UpdatePlatform('some user id', {
        itemId: '1',
        platform: 'new platform'
      });

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(historyService, 'updatePlatform').and.callThrough();
      effects.updatePlatform$.subscribe(() => {
        expect(historyService.updatePlatform).toHaveBeenCalled();
      });
    });
  });

  describe('Update Elapsed Time', () => {
    it('Should dispatch UpdateElapsedTimeSucceeded', () => {
      const payload: UpdateHistoryItemTimesPayload = {
        itemId: '1',
        startTime: 6000,
        endTime: 9000
      };
      const action = new historyActions.UpdateElapsedTime('some user id', payload);

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new historyActions.UpdateElapsedTimeSucceeded(payload)
      });

      expect(effects.updateElapsedTime$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new historyActions.UpdateElapsedTime('some user id', {
        itemId: '1',
        startTime: 6000,
        endTime: 9000
      });
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(historyActions.UPDATE_ELAPSED_TIME, message)
      });

      spyOn(historyService, 'updateElapsedTime').and.callFake(() => throwError({ message }));
      expect(effects.updateElapsedTime$).toBeObservable(expected);
    });

    it('Should call HistoryService updateElapsedTime', () => {
      const action = new historyActions.UpdateElapsedTime('some user id', {
        itemId: '1',
        startTime: 6000,
        endTime: 9000
      });

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(historyService, 'updateElapsedTime').and.callThrough();
      effects.updateElapsedTime$.subscribe(() => {
        expect(historyService.updateElapsedTime).toHaveBeenCalled();
      });
    });
  });
});
