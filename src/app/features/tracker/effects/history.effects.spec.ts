import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import { HistoryEffects } from './history.effects';

import { HistoryService } from '../services/history.service';

import * as historyActions from '../actions/history.actions';
import * as timerActions from '../actions/timer.actions';

import { HistoryEntity } from '../reducers/history.reducer';

import {
    UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload, UpdateHistoryItemTimesPayload
} from '../models';

import '../../../rxjs-operators';

describe('History Effects', () => {
  let actions: any;
  let effects: HistoryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HistoryEffects,
        provideMockActions(() => actions),
        { provide: HistoryService, useClass: MockHistoryService }
      ]
    });
    effects = TestBed.get(HistoryEffects);
  });

  describe('Load History Items', () => {
    it('Should dispatch LoadHistoryItemsSucceeded', () => {
      const action = new historyActions.LoadHistoryItems('some user id');

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new historyActions.LoadHistoryItemsSucceeded(mockItems)
      });

      expect(effects.loadHistoryItems$).toBeObservable(expected);
    });

    it('Should call HistoryService getHistoryList', () => {
      fail();
    });
  });

  describe('Save Timer Info Succeeded', () => {
    it('Should dispatch AddNewHistoryItem', () => {
      const action = new timerActions.SaveTimerInfoSucceeded(mockItems[0]);

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new historyActions.AddNewHistoryItem(mockItems[0])
      });

      expect(effects.saveTimerInfoSucceeded$).toBeObservable(expected);
    });
  });

  describe('Remove History Item', () => {
    it('Should dispatch RemoveHistoryItemSucceeded', () => {
      const itemId = 'some id';
      const action = new historyActions.RemoveHistoryItem('some user id', itemId);

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new historyActions.RemoveHistoryItemSucceeded(itemId)
      });

      expect(effects.removeHistoryItem$).toBeObservable(expected);
    });

    it('Should call HistoryService deleteHistoryItem', () => {
      fail();
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

    it('Should call HistoryService updateGame', () => {
      fail();
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

    it('Should call HistoryService updatePlatform', () => {
      fail();
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

    it('Should call HistoryService updateElapsedTime', () => {
      fail();
    });
  });
});

const mockItems: HistoryEntity[] = [
  {
    id: '1',
    game: 'some game',
    platform: 'some platform',
    startTime: 3000,
    endTime: 6000
  }
];

class MockHistoryService {
  getHistoryList(_userId: string): Observable<HistoryEntity[]> {
    return Observable.of(mockItems);
  }

  deleteHistoryItem(_userId: string, itemId: string): Observable<string> {
    return Observable.of(itemId);
  }

  updateGame(_userId: string, payload: UpdateHistoryItemGamePayload): Observable<UpdateHistoryItemGamePayload> {
    return Observable.of(payload);
  }

  updatePlatform(_userId: string, payload: UpdateHistoryItemPlatformPayload): Observable<UpdateHistoryItemPlatformPayload> {
    return Observable.of(payload);
  }

  updateElapsedTime(_userId: string, payload: UpdateHistoryItemTimesPayload): Observable<UpdateHistoryItemTimesPayload> {
    return Observable.of(payload);
  }
}
