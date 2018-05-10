import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { DashboardComponent } from './dashboard.component';

import { TimePipe } from '../../shared/pipes/time.pipe';

import * as historyActions from '../../features/tracker/actions/history.actions';

import * as fromTracker from '../../features/tracker/reducers/root.reducer';
import * as fromRoot from '../../reducers/root.reducer';
import * as fromDashboard from './reducers/root.reducer';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: Store<fromTracker.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TimePipe
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tracker': combineReducers(fromTracker.reducers),
          'dashboard': combineReducers(fromDashboard.reducers)
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'select').and.callThrough();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should select date list', async(() => {
    expect(store.select).toHaveBeenCalledWith(fromDashboard._selectDateList);
  }));

  it('Should select date range type', () => {
    expect(store.select).toHaveBeenCalledWith(fromDashboard._selectRangeType);
  });

  it('Should select groupings by date', async(() => {
    expect(store.select).toHaveBeenCalledWith(fromTracker._selectHistoryGroupingsByDate);
  }));

  it('Should select groupings by platform', async(() => {
    expect(store.select).toHaveBeenCalledWith(fromTracker._selectHistoryGroupingsByPlatform);
  }));

  it('Should select groupings by game', async(() => {
    expect(store.select).toHaveBeenCalledWith(fromTracker._selectHistoryGroupingsByGame);
  }));

  it('Should select history loading', async(() => {
    expect(store.select).toHaveBeenCalledWith(fromTracker._selectHistoryLoading);
  }));

  describe('When data is loading', () => {
    beforeEach(async(() => {
      store.dispatch(new historyActions.LoadHistoryItems(''));
      fixture.detectChanges();
    }));

    it('Should show loading spinner', async(() => {
      const spinner = fixture.nativeElement.querySelector('app-shared-spinner');
      expect(spinner).toBeTruthy();
    }));

    it('Should not show dashboard', async(() => {
      const dashboard = fixture.nativeElement.querySelector('.dashboard');
      expect(dashboard).toBeNull();
    }));
  });

  describe('When data is loaded', () => {
    beforeEach(async(() => {
      store.dispatch(new historyActions.LoadHistoryItemsSucceeded([]));
      fixture.detectChanges();
    }));

    it('Should not show loading spinner', async(() => {
      const spinner = fixture.nativeElement.querySelector('app-shared-spinner');
      expect(spinner).toBeNull();
    }));

    it('Should show dashboard', async(() => {
      const dashboard = fixture.nativeElement.querySelector('.dashboard');
      expect(dashboard).toBeTruthy();
    }));
  });
});
