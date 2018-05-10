import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { TrackerComponent } from './tracker.component';

import { ClockService } from './services/clock.service';

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
    expect(store.select).toHaveBeenCalledWith(fromTracker._selectPlatformsOptions);
  });

  it('Should select history groupings by date', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectHistoryGroupingsByDate);
  });

  it('Should select history loading', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectHistoryLoading);
  });
});

const clockServiceStub = {
  getCurrentTime: jasmine.createSpy('getCurrentTime')
};
