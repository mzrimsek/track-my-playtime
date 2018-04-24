import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import { TimerEffects } from './timer.effects';

import { HistoryService } from '../services/history.service';
import { TimerService } from '../services/timer.service';

import * as timerActions from '../actions/timer.actions';

import '../../../rxjs-operators';

describe('Timer Effects', () => {
  let actions: any;
  let effects: TimerEffects;

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
  });

  describe('Save Timer Info', () => {
    it('Should dispatch SaveTimerInfoSucceeded and ResetTimer', () => {
      fail();
    });

    it('Should call HistorySrevice saveTimerInfo', () => {

    });
  });

  describe('Cancel Timer', () => {
    it('Should dispatch ResetTimer', () => {
      fail();
    });
  });

  describe('Load Timer Info', () => {
    it('Should dispatch LoadTimerInfoSucceeded', () => {
      fail();
    });

    it('Should call TimerService getTimerInfo', () => {
      fail();
    });
  });
});

class MockTimerService {

}

class MockHistoryService {

}
