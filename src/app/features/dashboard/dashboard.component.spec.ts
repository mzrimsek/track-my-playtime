import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { DashboardComponent } from './dashboard.component';

import { TimePipe } from '../../shared/pipes/time.pipe';

import * as historyActions from '../../shared/actions/history.actions';

import * as fromRoot from '../../reducers/root.reducer';
import * as fromShared from '../../shared/reducers/root.reducer';
import * as fromDashboard from './reducers/root.reducer';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TimePipe
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'shared': combineReducers(fromShared.reducers),
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
    expect(store.select).toHaveBeenCalledWith(fromShared._selectHistoryGroupingsByDate);
  }));

  it('Should select groupings by platform', async(() => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectHistoryGroupingsByPlatform);
  }));

  it('Should select groupings by game', async(() => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectHistoryGroupingsByGame);
  }));

  it('Should select history loading', async(() => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectHistoryLoading);
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
