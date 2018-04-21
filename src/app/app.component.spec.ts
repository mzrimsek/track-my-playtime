import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/home/home.component';
import { TrackerComponent } from './features/tracker/tracker.component';

import { GraphService } from './features/dashboard/services/graph.service';
import { ClockService } from './features/tracker/services/clock.service';

import { TimePipe } from './shared/pipes/time.pipe';

import * as actions from './actions/app.actions';

import * as fromTracker from './features/tracker/reducers/root.reducer';
import * as fromRoot from './reducers/root.reducer';

import './rxjs-operators';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<fromRoot.State>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        TrackerComponent,
        DashboardComponent,
        TimePipe
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: HomeComponent
          },
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'app',
            children: [
              {
                path: 'tracker',
                component: TrackerComponent
              },
              {
                path: 'dashboard',
                component: DashboardComponent
              },
              {
                path: '**',
                redirectTo: '/app/tracker',
                pathMatch: 'full'
              }
            ]
          }
        ]),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tracker': combineReducers(fromTracker.reducers)
        })
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        GraphService,
        ClockService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    router = TestBed.get(Router);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should dispatch Initialize Application', async(() => {
    const action = new actions.InitializeApplication();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  describe('On Base Route', () => {
    beforeEach(async(() => {
      router.navigate(['']);
    }));

    it('shouldShowHeader returns true', async(() => {
      const shouldShowHeader = component.shouldShowHeader();
      expect(shouldShowHeader).toBe(true);
    }));

    it('Should show header', async(() => {
      fixture.detectChanges();
      const header = fixture.nativeElement.querySelector('app-header');
      expect(header).toBeTruthy();
    }));

    it('Should not show nav', async(() => {
      fixture.detectChanges();
      const nav = fixture.nativeElement.querySelector('app-nav');
      expect(nav).toBeNull();
    }));
  });

  describe('On Login Route', () => {
    beforeEach(async(() => {
      router.navigate(['login']);
    }));

    it('shouldShowHeader returns true', async(() => {
      const shouldShowHeader = component.shouldShowHeader();
      expect(shouldShowHeader).toBe(true);
    }));

    it('Should show header', async(() => {
      fixture.detectChanges();
      const header = fixture.nativeElement.querySelector('app-header');
      expect(header).toBeTruthy();
    }));

    it('Should not show nav', async(() => {
      fixture.detectChanges();
      const nav = fixture.nativeElement.querySelector('app-nav');
      expect(nav).toBeNull();
    }));
  });

  describe('On App Route', () => {
    beforeEach(async(() => {
      router.navigate(['app']);
    }));

    it('shouldShowHeader returns false', async(() => {
      const shouldShowHeader = component.shouldShowHeader();
      expect(shouldShowHeader).toBe(false);
    }));

    // FIXME: This test fails when it is async
    it('Should not show header', () => {
      fixture.detectChanges();
      const header = fixture.nativeElement.querySelector('app-header');
      expect(header).toBeNull();
    });

    // FIXME: This test fails when it is async
    it('Should show nav', () => {
      fixture.detectChanges();
      const nav = fixture.nativeElement.querySelector('app-nav');
      expect(nav).toBeTruthy();
    });

    // FIXME: This test fails when it is async
    it('Should show tracker component', () => {
      fixture.detectChanges();
      const tracker = fixture.nativeElement.querySelector('app-tracker');
      expect(tracker).toBeTruthy();
    });
  });

  describe('On Tracker Route', () => {
    beforeEach(async(() => {
      router.navigate(['app/tracker']);
    }));

    // FIXME: This test fails when it is async
    it('Should show tracker component', () => {
      fixture.detectChanges();
      const tracker = fixture.nativeElement.querySelector('app-tracker');
      expect(tracker).toBeTruthy();
    });
  });

  describe('On Dashboard Route', () => {
    beforeEach(async(() => {
      router.navigate(['app/dashboard']);
    }));

    it('Should show dashboard component', async(() => {
      fixture.detectChanges();
      const dashboard = fixture.nativeElement.querySelector('app-dashboard');
      expect(dashboard).toBeTruthy();
    }));
  });
});
