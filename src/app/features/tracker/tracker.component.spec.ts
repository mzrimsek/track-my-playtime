import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { addDays } from 'date-fns';

import { TrackerComponent } from './tracker.component';

import { ElapsedTimeService } from '../../shared/services/elapsed-time.service';

import * as historyActions from '../../shared/actions/history.actions';

import * as fromRoot from '../../reducers/root.reducer';
import * as fromShared from '../../shared/reducers/root.reducer';
import * as fromTracker from './reducers/root.reducer';

import { tracker } from '../../test-helpers';

describe('Tracker Component', () => {
  let store: Store<fromRoot.State>;
  let elapsedTimeService: ElapsedTimeService;
  let component: TrackerComponent;
  let fixture: ComponentFixture<TrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrackerComponent
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'shared': combineReducers(fromShared.reducers),
          'tracker': combineReducers(fromTracker.reducers)
        })
      ],
      providers: [{ provide: ElapsedTimeService, useValue: tracker.elapsedTimeServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    elapsedTimeService = TestBed.get(ElapsedTimeService);

    spyOn(store, 'select').and.callThrough();

    fixture = TestBed.createComponent(TrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should select timer info', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectTimerInfo);
  });

  it('Should call ElaspedTimeService getElapsedTime', () => {
    expect(elapsedTimeService.getElapsedTime).toHaveBeenCalledWith('00:00:00');
  });

  it('Should select platforms options', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectPlatformsOptions);
  });

  it('Should select history groupings by date', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectHistoryGroupingsByDate);
  });

  it('Should select entries to show', () => {
    expect(store.select).toHaveBeenCalledWith(fromTracker._selectEntriesToShow);
  });

  describe('Load More Button', () => {
    const start = new Date();
    it('Should be visible when there are more groupings to show', () => {
      const action = new historyActions.LoadHistoryItemsSucceeded([{
        id: '1',
        game: 'some game',
        platform: 'some platform',
        startTime: start.getTime(),
        endTime: start.getTime() + 3000
      }, {
        id: '2',
        game: 'some game',
        platform: 'some platform',
        startTime: addDays(start, 1).getTime(),
        endTime: addDays(start, 1).getTime() + 3000
      }, {
        id: '3',
        game: 'some game',
        platform: 'some platform',
        startTime: addDays(start, 2).getTime(),
        endTime: addDays(start, 2).getTime() + 3000
      }, {
        id: '4',
        game: 'some game',
        platform: 'some platform',
        startTime: addDays(start, 3).getTime(),
        endTime: addDays(start, 3).getTime() + 3000
      }, {
        id: '5',
        game: 'some game',
        platform: 'some platform',
        startTime: addDays(start, 4).getTime(),
        endTime: addDays(start, 4).getTime() + 3000
      }]);
      store.dispatch(action);
      fixture.detectChanges();

      const loadMoreButton = fixture.nativeElement.querySelector('app-tracker-load-more');

      expect(loadMoreButton).toBeTruthy();
    });

    it('Should not be visible when all groupings are shown', () => {
      const action = new historyActions.LoadHistoryItemsSucceeded([{
        id: '1',
        game: 'some game',
        platform: 'some platform',
        startTime: start.getTime(),
        endTime: start.getTime() + 3000
      }, {
        id: '2',
        game: 'some game',
        platform: 'some platform',
        startTime: addDays(start, 1).getTime(),
        endTime: addDays(start, 1).getTime() + 3000
      }, {
        id: '3',
        game: 'some game',
        platform: 'some platform',
        startTime: addDays(start, 2).getTime(),
        endTime: addDays(start, 2).getTime() + 3000
      }]);
      store.dispatch(action);
      fixture.detectChanges();

      const loadMoreButton = fixture.nativeElement.querySelector('app-tracker-load-more');

      expect(loadMoreButton).toBeNull();
    });

    it('Should not be visible when no groupings to show', () => {
      const loadMoreButton = fixture.nativeElement.querySelector('app-tracker-load-more');
      expect(loadMoreButton).toBeNull();
    });
  });
});
