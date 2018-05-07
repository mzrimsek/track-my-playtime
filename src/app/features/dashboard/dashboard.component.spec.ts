import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { DashboardComponent } from './dashboard.component';

import { GraphService } from './services/graph.service';

import { TimePipe } from '../../shared/pipes/time.pipe';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let graphService: GraphService;

  const initTests = () => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TimePipe
      ],
      providers: [{ provide: GraphService, useValue: graphServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    graphService = TestBed.get(GraphService);

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

    it('Should call GraphService getTimeVsDateGraphData', async(() => {
      expect(graphService.getTimeVsDateGraphData).toHaveBeenCalled();
    }));

    it('Should call GraphService getTimeVsPlatformGraphData', async(() => {
      expect(graphService.getTimeVsPlatformGraphData).toHaveBeenCalled();
    }));

    it('Should call GraphService getTimeVsGameGraphData', async(() => {
      expect(graphService.getTimeVsGameGraphData).toHaveBeenCalled();
    }));

    it('Should call GraphService isHistoryDataLoading', async(() => {
      expect(graphService.isHistoryDataLoading).toHaveBeenCalled();
    }));
  });

  describe('When data is loading', () => {
    beforeEach(async(() => {
      graphServiceStub.isHistoryDataLoading = jasmine
        .createSpy('isHistoryDataLoading')
        .and
        .returnValue(Observable.of(true));
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
      graphServiceStub.isHistoryDataLoading = jasmine
        .createSpy('isHistoryDataLoading')
        .and
        .returnValue(Observable.of(false));
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

const graphServiceStub = {
  getTimeVsDateGraphData: jasmine
    .createSpy('getTimeVsDateGraphData')
    .and
    .returnValue(Observable.of([{
      name: '',
      value: 10
    }, {
      name: '',
      value: 50
    }])),
  getTimeVsPlatformGraphData: jasmine
    .createSpy('getTimeVsPlatformGraphData')
    .and
    .returnValue(Observable.of([])),
  getTimeVsGameGraphData: jasmine
    .createSpy('getTimeVsGameGraphData')
    .and
    .returnValue(Observable.of([])),
  isHistoryDataLoading: jasmine.createSpy('isHistoryDataLoading')
};
