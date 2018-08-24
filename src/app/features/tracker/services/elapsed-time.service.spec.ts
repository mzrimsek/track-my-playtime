import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ElapsedTimeService } from './elapsed-time.service';

import * as actions from '../actions/timer.actions';

import * as fromRoot from '../../../reducers/root.reducer';
import * as fromTracker from '../reducers/root.reducer';

import { tracker } from '../../../test-helpers';

describe('ElapsedTimeService', () => {
  let service: ElapsedTimeService;
  let store: Store<fromRoot.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElapsedTimeService],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tracker': combineReducers(fromTracker.reducers)
        })
      ]
    });

    service = TestBed.get(ElapsedTimeService);
    store = TestBed.get(Store);

    spyOn(store, 'select').and.callThrough();
    spyOn(service, 'getCurrentTime').and.callFake(() => Observable.of(70000));
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
