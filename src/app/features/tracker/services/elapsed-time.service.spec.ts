import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ClockService } from './clock.service';
import { ElapsedTimeService } from './elapsed-time.service';

import * as actions from '../actions/timer.actions';

import * as fromRoot from '../../../reducers/root.reducer';
import * as fromTracker from '../reducers/root.reducer';

import { tracker } from '../../../test-helpers';

describe('ElapsedTimeService', () => {
  let service: ElapsedTimeService;
  let clockService: ClockService;
  let store: Store<fromRoot.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ElapsedTimeService,
        { provide: ClockService, useClass: tracker.MockClockService }
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tracker': combineReducers(fromTracker.reducers)
        })
      ]
    });

    service = TestBed.get(ElapsedTimeService);
    clockService = TestBed.get(ClockService);
    store = TestBed.get(Store);

    spyOn(clockService, 'getCurrentTime').and.callFake(() => Observable.of(70000));
    spyOn(store, 'select').and.callThrough();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getElapsedTime', () => {
    const inactiveValue = 'inactive';

    it('Should select timerInfo', () => {
      service.getElapsedTime(inactiveValue);
      expect(store.select).toHaveBeenCalledWith(fromTracker._selectTimerInfo);
    });

    it('Should call clockService getCurrentTime', () => {
      service.getElapsedTime(inactiveValue);
      expect(clockService.getCurrentTime).toHaveBeenCalled();
    });

    it('Should return inactiveValue when timer is not active', () => {
      const result = service.getElapsedTime(inactiveValue);
      result.subscribe(res => {
        expect(res).toBe(inactiveValue);
      });
    });

    it('Should return elapsed time when timer is active', () => {
      store.dispatch(new actions.SetTimerInfo({
        ...tracker.testInfo,
        startTime: 10000
      }));
      const result = service.getElapsedTime(inactiveValue);
      result.subscribe(res => {
        expect(res).toBe('00:01:00');
      });
    });
  });
});
