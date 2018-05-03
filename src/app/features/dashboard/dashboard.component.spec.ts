import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { DashboardComponent } from './dashboard.component';

import { GraphService } from './services/graph.service';

import { TimePipe } from '../../shared/pipes/time.pipe';

import { GraphDataItem } from './models';

// FIXME: Not totally satisfied with how these tests are set up
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const initTests = () => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TimePipe
      ],
      providers: [{ provide: GraphService, useClass: MockGraphService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  describe('Render', () => {
    beforeEach(async(() => {
      initTests();
    }));

    it('Should create the component', async(() => {
      expect(component).toBeTruthy();
    }));
  });

  describe('When data is loading', () => {
    beforeEach(async(() => {
      loading = true;
      initTests();
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
      loading = false;
      initTests();
    }));

    it('Should not show loading spinner', async(() => {
      const spinner = fixture.nativeElement.querySelector('app-shared-spinner');
      expect(spinner).toBeNull();
    }));

    it('Should show dashboard', async(() => {
      const dashboard = fixture.nativeElement.querySelector('.dashboard');
      expect(dashboard).toBeTruthy();
    }));

    it('Should show header with total time', async(() => {
      const header = fixture.nativeElement.querySelector('.header .total');
      expect(header.innerText).toBe('00:01:00 This Week');
    }));
  });
});

let loading: boolean;

class MockGraphService {
  getTimeVsDateGraphData(): Observable<GraphDataItem[]> {
    return Observable.of([{
      name: '',
      value: 10
    }, {
      name: '',
      value: 50
    }]);
  }

  getTimeVsPlatformGraphData(): Observable<GraphDataItem[]> {
    return Observable.of([]);
  }

  getTimeVsGameGraphData(): Observable<GraphDataItem[]> {
    return Observable.of([]);
  }

  isHistoryDataLoading(): Observable<boolean> {
    return Observable.of(loading);
  }
}
