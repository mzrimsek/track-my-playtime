import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { of } from 'rxjs';

import { AppComponent } from './app.component';
import {
    ForgotPasswordComponent
} from './features/auth/components/forgot-password/forgot-password.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { CompletionComponent } from './features/completion/completion.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/home/home.component';
import { LibraryComponent } from './features/library/library.component';
import { ProfileComponent } from './features/profile/profile.component';
import { TrackerComponent } from './features/tracker/tracker.component';

import { UserService } from './features/auth/services/user.service';
import { ElapsedTimeService } from './features/tracker/services/elapsed-time.service';

import { TimePipe } from './shared/pipes/time.pipe';

import * as fromAuth from './features/auth/reducers/root.reducer';
import * as fromCompletion from './features/completion/reducers/root.reducer';
import * as fromDashboard from './features/dashboard/reducers/root.reducer';
import * as fromProfile from './features/profile/reducers/root.reducer';
import * as fromTracker from './features/tracker/reducers/root.reducer';
import * as fromRoot from './reducers/root.reducer';
import * as fromShared from './shared/reducers/root.reducer';

import { tracker } from './test-helpers';

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
        RegisterComponent,
        ForgotPasswordComponent,
        TrackerComponent,
        DashboardComponent,
        LibraryComponent,
        CompletionComponent,
        ProfileComponent,
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
            path: 'register',
            component: RegisterComponent
          },
          {
            path: 'forgotPassword',
            component: ForgotPasswordComponent
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
                path: 'profile',
                component: ProfileComponent
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
          'auth': combineReducers(fromAuth.reducers),
          'shared': combineReducers(fromShared.reducers),
          'tracker': combineReducers(fromTracker.reducers),
          'dashboard': combineReducers(fromDashboard.reducers),
          'completion': combineReducers(fromCompletion.reducers),
          'profile': combineReducers(fromProfile.reducers)
        })
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        FormBuilder,
        UserService,
        { provide: ElapsedTimeService, useClass: tracker.MockElapsedTimeService }
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

  describe('On Register Route', () => {
    beforeEach(async(() => {
      router.navigate(['register']);
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

  describe('On ForgotPassword Route', () => {
    beforeEach(async(() => {
      router.navigate(['forgotPassword']);
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

  describe('User data loaded', () => {
    beforeEach(async(() => {
      component.userDataLoaded$ = of(true);
    }));

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
        const trackerComponent = fixture.nativeElement.querySelector('app-tracker');
        expect(trackerComponent).toBeTruthy();
      });
    });

    describe('On Tracker Route', () => {
      beforeEach(async(() => {
        router.navigate(['app/tracker']);
      }));

      it('Should show tracker component', () => {
        fixture.detectChanges();
        const trackerComponent = fixture.nativeElement.querySelector('app-tracker');
        expect(trackerComponent).toBeTruthy();
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

    describe('On Profile Route', () => {
      beforeEach(async(() => {
        router.navigate(['app/profile']);
      }));

      it('Should show profile component', async(() => {
        fixture.detectChanges();
        const profile = fixture.nativeElement.querySelector('app-profile');
        expect(profile).toBeTruthy();
      }));
    });
  });

  describe('User data not loaded', () => {
    beforeEach(async(() => {
      component.userDataLoaded$ = of(false);
    }));

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

      it('Should show loading screen', () => {
        fixture.detectChanges();
        const loading = fixture.nativeElement.querySelector('.main .loading');
        expect(loading).toBeTruthy();
      });
    });

    describe('On Tracker Route', () => {
      beforeEach(async(() => {
        router.navigate(['app/tracker']);
      }));

      it('Should show loading screen', () => {
        fixture.detectChanges();
        const loading = fixture.nativeElement.querySelector('.main .loading');
        expect(loading).toBeTruthy();
      });
    });

    describe('On Dashboard Route', () => {
      beforeEach(async(() => {
        router.navigate(['app/dashboard']);
      }));

      it('Should show loading screen', () => {
        fixture.detectChanges();
        const loading = fixture.nativeElement.querySelector('.main .loading');
        expect(loading).toBeTruthy();
      });
    });

    describe('On Library Route', () => {
      beforeEach(async(() => {
        router.navigate(['app/library']);
      }));

      it('Should show loading screen', () => {
        fixture.detectChanges();
        const loading = fixture.nativeElement.querySelector('.main .loading');
        expect(loading).toBeTruthy();
      });
    });

    describe('On Completion Route', () => {
      beforeEach(async(() => {
        router.navigate(['app/completion']);
      }));

      it('Should show loading screen', () => {
        fixture.detectChanges();
        const loading = fixture.nativeElement.querySelector('.main .loading');
        expect(loading).toBeTruthy();
      });
    });

    describe('On Profile Route', () => {
      beforeEach(async(() => {
        router.navigate(['app/profile']);
      }));

      it('Should show loading screen', () => {
        fixture.detectChanges();
        const loading = fixture.nativeElement.querySelector('.main .loading');
        expect(loading).toBeTruthy();
      });
    });
  });
});
