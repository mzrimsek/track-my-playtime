import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromRoot from 'app/reducers/root.reducer';
import * as actions from 'features/dashboard/actions/date-range.actions';
import * as fromDashboard from 'features/dashboard/reducers/root.reducer';

import { HeaderComponent } from './header.component';

import { TimePipe } from 'shared/pipes/time.pipe';

describe('HeaderComponent', () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let store: Store<fromDashboard.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestWrapperComponent,
        HeaderComponent,
        TimePipe
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'dashboard': combineReducers(fromDashboard.reducers)
        })
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('When date range select changes', () => {
    it('Should dispatch SetThisWeek when "THIS_WEEK" is selected', async(() => {
      const dateRangeEl = fixture.nativeElement.querySelector('.range-options select');

      dateRangeEl.selectedIndex = 0;
      dateRangeEl.dispatchEvent(new Event('change'));

      expect(store.dispatch).toHaveBeenCalledWith(new actions.SetThisWeek());
    }));

    it('Should dispatch SetLastWeek when "LAST_WEEK" is selected', async(() => {
      const dateRangeEl = fixture.nativeElement.querySelector('.range-options select');

      dateRangeEl.selectedIndex = 1;
      dateRangeEl.dispatchEvent(new Event('change'));

      expect(store.dispatch).toHaveBeenCalledWith(new actions.SetLastWeek());
    }));

    it('Should dispatch SetThisMonth when "THIS_MONTH" is selected', async(() => {
      const dateRangeEl = fixture.nativeElement.querySelector('.range-options select');

      dateRangeEl.selectedIndex = 2;
      dateRangeEl.dispatchEvent(new Event('change'));

      expect(store.dispatch).toHaveBeenCalledWith(new actions.SetThisMonth());
    }));

    it('Should dispatch SetLastMonth when "LAST_MONTH" is selected', async(() => {
      const dateRangeEl = fixture.nativeElement.querySelector('.range-options select');

      dateRangeEl.selectedIndex = 3;
      dateRangeEl.dispatchEvent(new Event('change'));

      expect(store.dispatch).toHaveBeenCalledWith(new actions.SetLastMonth());
    }));

    it('Should dispatch SetThisWeek when "" is selected', async(() => {
      const dateRangeEl = fixture.nativeElement.querySelector('.range-options select');

      dateRangeEl.selectedIndex = 4;
      dateRangeEl.dispatchEvent(new Event('change'));

      expect(store.dispatch).toHaveBeenCalledWith(new actions.SetThisWeek());
    }));
  });

  it('Should have correctly formatted total time', async(() => {
    component.totalTime = 60;
    fixture.detectChanges();

    const totalTimeEl = fixture.nativeElement.querySelector('.total');

    expect(totalTimeEl.innerText).toBe('00:01:00');
  }));
});

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-wrapper',
  template: `
    <app-dashboard-header [totalTime]="totalTime"
                          [rangeType]="rangeType"></app-dashboard-header>
`
})
class TestWrapperComponent {
  totalTime = 0;
  rangeType = 'THIS_WEEK';
}
