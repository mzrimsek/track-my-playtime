import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { HomeComponent } from './features/home/home.component';

import * as actions from './actions/app.actions';

import { reducers, State } from './reducers/root.reducer';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<State>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent
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
            children: []
          }
        ]),
        StoreModule.forRoot({
          ...reducers
        })
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
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
      fixture.detectChanges();
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
      fixture.detectChanges();
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
      fixture.detectChanges();
      const shouldShowHeader = component.shouldShowHeader();
      expect(shouldShowHeader).toBe(false);
    }));

    it('Should not show header', async(() => {
      fixture.detectChanges();
      const header = fixture.nativeElement.querySelector('app-header');
      expect(header).toBeNull();
    }));

    it('Should show nav', async(() => {
      fixture.detectChanges();
      const nav = fixture.nativeElement.querySelector('app-nav');
      expect(nav).toBeTruthy();
    }));
  });
});
