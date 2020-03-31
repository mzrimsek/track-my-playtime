import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { tracker } from 'app/test-helpers';
import { of } from 'rxjs';

import { ElapsedTimeService } from './elapsed-time.service';

import * as actions from 'shared/actions/timer.actions';

import * as fromRoot from 'app/reducers/root.reducer';
import * as fromShared from 'shared/reducers/root.reducer';

describe('ElapsedTimeService', () => {
  let service: ElapsedTimeService;
  let store: Store<fromRoot.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElapsedTimeService],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'shared': combineReducers(fromShared.reducers)
        })
      ]
    });

    service = TestBed.get(ElapsedTimeService);
    store = TestBed.get(Store);

    spyOn(store, 'select').and.callThrough();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should have currentTime$ be undefined at start', () => {
    expect(service.currentTime$).toBeUndefined();
  });

  describe('getElapsedTime', () => {
    const inactiveValue = 'inactive';

    beforeEach(() => {
      spyOn(service, 'getCurrentTime').and.callFake(() => of(70000));
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

  describe('getCurrentTime', () => {
    it('Should set currentTime$ when it is undefined', () => {
      service.getCurrentTime();
      expect(service.currentTime$).not.toBeUndefined();
    });

    it('Should return currentTime$ when it is set', () => {
      service.getCurrentTime(); // set currentTime$
      const result = service.getCurrentTime();
      expect(service.currentTime$).toEqual(result);
    });
  });
});
