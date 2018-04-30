import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { GraphService } from './graph.service';

import * as historyActions from '../../tracker/actions/history.actions';

import * as fromRoot from '../../../reducers/root.reducer';
import * as fromTracker from '../../tracker/reducers/root.reducer';

describe('Graph Service', () => {
  let service: GraphService;
  let store: Store<fromTracker.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tracker': combineReducers(fromTracker.reducers)
        })
      ],
      providers: [GraphService]
    });

    service = TestBed.get(GraphService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTimeVsDateGraphData', () => {
    describe('When no data in range', () => {
      it('Should return seven empty data points', () => {
        const result = service.getTimeVsDateGraphData();
        result.subscribe(res => {
          expect(res.length).toBe(7);
        });
      });

      it('Should return data points with 0 in value', () => {
        const result = service.getTimeVsDateGraphData();
        result.subscribe(res => {
          const allZero = res.every(x => x.value === 0);
          expect(allZero).toBe(true);
        });
      });
    });

    describe('When data in range', () => {

    });
  });

  describe('getTimeVsPlatformGraphData', () => {
    it('Should return nothing when no data in range', () => {
      const result = service.getTimeVsPlatformGraphData();
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });
  });

  describe('getTimeVsGameGraphData', () => {
    it('Should return nothing when no data in range', () => {
      const result = service.getTimeVsGameGraphData();
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });
  });

  describe('isHistoryDataLoading', () => {
    it('Should return false when nothing loading', () => {
      const result = service.isHistoryDataLoading();
      result.subscribe(res => {
        expect(res).toBe(false);
      });
    });

    it('Should return true when data loading', () => {
      store.dispatch(new historyActions.LoadHistoryItems('user id'));
      const result = service.isHistoryDataLoading();
      result.subscribe(res => {
        expect(res).toBe(true);
      });
    });
  });
});
