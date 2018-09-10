import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { ReplaySubject, throwError } from 'rxjs';

import { TimerEffects } from './timer.effects';

import { HistoryService } from '../services/history.service';
import { TimerService } from '../services/timer.service';

import * as appActions from '../../../actions/app.actions';
import * as timerActions from '../../../shared/actions/timer.actions';

import { history, tracker } from '../../../test-helpers';

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
        { provide: TimerService, useClass: tracker.MockTimerService },
        { provide: HistoryService, useClass: history.MockHistoryService }
      ]
    });

    effects = TestBed.get(TimerEffects);
    timerService = TestBed.get(TimerService);
    historyService = TestBed.get(HistoryService);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
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
        b: new timerActions.SaveTimerInfoSucceeded(history.mockEntity),
        c: new timerActions.ResetTimer()
      });

      expect(effects.saveTimerInfo$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new timerActions.SaveTimerInfo({
        userId: 'some user id',
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 6000
      });
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(timerActions.SAVE_TIMER_INFO, message)
      });

      spyOn(historyService, 'saveTimerInfo').and.callFake(() => throwError({ message }));
      expect(effects.saveTimerInfo$).toBeObservable(expected);
    });

    it('Should call HistoryService saveTimerInfo', () => {
      const action = new timerActions.SaveTimerInfo({
        userId: 'some user id',
        ...tracker.testInfo,
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
        b: new timerActions.SetTimerInfo(tracker.testInfo)
      });

      expect(effects.loadTimerInfo$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const action = new timerActions.LoadTimerInfo('user id');
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(timerActions.LOAD_TIMER_INFO, message)
      });

      spyOn(timerService, 'getTimerInfo').and.callFake(() => throwError({ message }));
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
