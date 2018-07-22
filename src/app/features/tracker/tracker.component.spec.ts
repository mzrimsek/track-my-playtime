import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { addDays } from 'date-fns';

import { TrackerComponent } from './tracker.component';

import { ClockService } from './services/clock.service';

import * as historyActions from '../../shared/actions/history.actions';

import * as fromRoot from '../../reducers/root.reducer';
import * as fromShared from '../../shared/reducers/root.reducer';
import * as fromTracker from './reducers/root.reducer';

describe('Tracker Component', () => {
  let store: Store<fromRoot.State>;
  let clockService: ClockService;
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
      providers: [{ provide: ClockService, useValue: clockServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    clockService = TestBed.get(ClockService);

    spyOn(store, 'select').and.callThrough();

    fixture = TestBed.createComponent(TrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should select timer info', () => {
    expect(store.select).toHaveBeenCalledWith(fromTracker._selectTimerInfo);
  });

  it('Should call ClockService getCurrentTime', () => {
    expect(clockService.getCurrentTime).toHaveBeenCalled();
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

const clockServiceStub = {
  getCurrentTime: jasmine.createSpy('getCurrentTime')
};
