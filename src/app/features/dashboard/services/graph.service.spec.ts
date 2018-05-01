import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { addDays, startOfWeek, subDays } from 'date-fns';

import { GraphService } from './graph.service';

import * as historyActions from '../../tracker/actions/history.actions';

import * as fromRoot from '../../../reducers/root.reducer';
import { HistoryEntity } from '../../tracker/reducers/history.reducer';
import * as fromTracker from '../../tracker/reducers/root.reducer';

import { formatDate } from '../../../shared/utils/date.utils';

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
      it('Should return the correct data', () => {
        store.dispatch(new historyActions.LoadHistoryItemsSucceeded(testItems));
        const result = service.getTimeVsDateGraphData();
        result.subscribe(res => {
          expect(res).toEqual([{
            name: formatDate(rangeStart),
            value: 1
          }, {
            name: formatDate(addDays(rangeStart, 1)),
            value: 0
          }, {
            name: formatDate(addDays(rangeStart, 2)),
            value: 0
          }, {
            name: formatDate(addDays(rangeStart, 3)),
            value: 0
          }, {
            name: formatDate(addDays(rangeStart, 4)),
            value: 4
          }, {
            name: formatDate(addDays(rangeStart, 5)),
            value: 0
          }, {
            name: formatDate(addDays(rangeStart, 6)),
            value: 0
          }]);
        });
      });
    });
  });

  describe('getTimeVsPlatformGraphData', () => {
    it('Should return nothing when no data in range', () => {
      const result = service.getTimeVsPlatformGraphData();
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return the correct data when in range', () => {
      store.dispatch(new historyActions.LoadHistoryItemsSucceeded(testItems));
      const result = service.getTimeVsPlatformGraphData();
      result.subscribe(res => {
        expect(res).toEqual([{
          name: 'platform 1',
          value: 4
        }, {
          name: 'platform 2',
          value: 1
        }]);
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

    it('Should return the correct data when in range', () => {
      store.dispatch(new historyActions.LoadHistoryItemsSucceeded(testItems));
      const result = service.getTimeVsGameGraphData();
      result.subscribe(res => {
        expect(res).toEqual([{
          name: 'game 2',
          value: 4
        }, {
          name: 'game 1',
          value: 1
        }]);
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

const rangeStart = startOfWeek(new Date());

const testItems: HistoryEntity[] = [{
  id: '1',
  game: 'game 1',
  platform: 'platform 1',
  startTime: rangeStart.getTime(),
  endTime: rangeStart.getTime() + 1000
}, {
  id: '2',
  game: 'game 2',
  platform: 'platform 1',
  startTime: addDays(rangeStart, 4).getTime(),
  endTime: addDays(rangeStart, 4).getTime() + 3000,
}, {
  id: '3',
  game: 'game 1',
  platform: 'platform 2',
  startTime: subDays(rangeStart, 1).getTime(),
  endTime: subDays(rangeStart, 1).getTime() + 2000
}, {
  id: '4',
  game: 'game 2',
  platform: 'platform 2',
  startTime: addDays(rangeStart, 4).getTime(),
  endTime: addDays(rangeStart, 4).getTime() + 1000
}];
