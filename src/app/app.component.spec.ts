import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { CompletionComponent } from './features/completion/completion.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/home/home.component';
import { LibraryComponent } from './features/library/library.component';
import { TrackerComponent } from './features/tracker/tracker.component';

import { ClockService } from './features/tracker/services/clock.service';

import { TimePipe } from './shared/pipes/time.pipe';

import * as actions from './actions/app.actions';

import * as fromCompletion from './features/completion/reducers/root.reducer';
import * as fromDashboard from './features/dashboard/reducers/root.reducer';
import * as fromTracker from './features/tracker/reducers/root.reducer';
import * as fromRoot from './reducers/root.reducer';
import * as fromShared from './shared/reducers/root.reducer';

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
        LibraryComponent,
        CompletionComponent,
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
                path: 'library',
                component: LibraryComponent
              },
              {
                path: 'completion',
                component: CompletionComponent
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
          'shared': combineReducers(fromShared.reducers),
          'tracker': combineReducers(fromTracker.reducers),
          'dashboard': combineReducers(fromDashboard.reducers),
          'completion': combineReducers(fromCompletion.reducers)
        })
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        ClockService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    router = TestBed.get(Router);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();

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

  it('Should select userDataLoaded', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectUserDataLoaded);
  });

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

    it('Should not show header', () => {
      fixture.detectChanges();
      const header = fixture.nativeElement.querySelector('app-header');
      expect(header).toBeNull();
    });

    it('Should show nav', () => {
      fixture.detectChanges();
      const nav = fixture.nativeElement.querySelector('app-nav');
      expect(nav).toBeTruthy();
    });

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

  describe('On Library Route', () => {
    beforeEach(async(() => {
      router.navigate(['app/library']);
    }));

    it('Should show library component', async(() => {
      fixture.detectChanges();
      const library = fixture.nativeElement.querySelector('app-library');
      expect(library).toBeTruthy();
    }));
  });

  describe('On Completion Route', () => {
    beforeEach(async(() => {
      router.navigate(['app/completion']);
    }));

    it('Should show completion component', async(() => {
      fixture.detectChanges();
      const completion = fixture.nativeElement.querySelector('app-completion');
      expect(completion).toBeTruthy();
    }));
  });
});
