import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { TimerEffects } from './timer.effects';

import { HistoryService } from '../services/history.service';
import { TimerService } from '../services/timer.service';

import * as timerActions from '../actions/timer.actions';

import { HistoryEntity } from '../reducers/history.reducer';

import { AddTimerInfo, TimerInfo } from '../models';

import '../../../rxjs-operators';

describe('Timer Effects', () => {
  let actions: any;
  let effects: TimerEffects;
  let timerService: TimerService;
  let historyService: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimerEffects,
        provideMockActions(() => actions),
        { provide: TimerService, useClass: MockTimerService },
        { provide: HistoryService, useClass: MockHistoryService }
      ]
    });
    effects = TestBed.get(TimerEffects);
    timerService = TestBed.get(TimerService);
    historyService = TestBed.get(HistoryService);
  });

  describe('Save Timer Info', () => {
    it('Should dispatch SaveTimerInfoSucceeded and ResetTimer', () => {
      const action = new timerActions.SaveTimerInfo({
        userId: 'some user id',
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 6000
      });

      actions = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: new timerActions.SaveTimerInfoSucceeded(mockItem),
        c: new timerActions.ResetTimer()
      });

      expect(effects.saveTimerInfo$).toBeObservable(expected);
    });

    it('Should call HistoryService saveTimerInfo', () => {
      const action = new timerActions.SaveTimerInfo({
        userId: 'some user id',
        ...mockInfo,
        endTime: 6000
      });

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(historyService, 'saveTimerInfo').and.callThrough();
      effects.saveTimerInfo$.subscribe(() => {
        expect(historyService.saveTimerInfo).toHaveBeenCalled();
      });
    });
  });

  describe('Cancel Timer', () => {
    it('Should dispatch ResetTimer', () => {
      actions = hot('-a', { a: new timerActions.CancelTimer() });
      const expected = cold('-(b)', {
        b: new timerActions.ResetTimer()
      });
      expect(effects.cancelTimer$).toBeObservable(expected);
    });
  });

  describe('Load Timer Info', () => {
    it('Should dispatch LoadTimerInfoSucceeded', () => {
      const action = new timerActions.LoadTimerInfo('user id');

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new timerActions.LoadTimerInfoSucceeded(mockInfo)
      });

      expect(effects.loadTimerInfo$).toBeObservable(expected);
    });

    it('Should call TimerService getTimerInfo', () => {
      const action = new timerActions.LoadTimerInfo('user id');

      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(timerService, 'getTimerInfo').and.callThrough();
      effects.loadTimerInfo$.subscribe(() => {
        expect(timerService.getTimerInfo).toHaveBeenCalled();
      });
    });
  });
});

const mockInfo: TimerInfo = {
  game: 'some game',
  platform: 'some platform',
  startTime: 3000
};

class MockTimerService {
  getTimerInfo(_userId: string): Observable<TimerInfo> {
    return Observable.of(mockInfo);
  }
}

const mockItem: HistoryEntity = {
  id: 'some id',
  game: 'some game',
  platform: 'some platform',
  startTime: 3000,
  endTime: 6000
};

class MockHistoryService {
  saveTimerInfo(_info: AddTimerInfo): Observable<HistoryEntity> {
    return Observable.of(mockItem);
  }
}
