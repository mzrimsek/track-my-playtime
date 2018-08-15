import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { DashboardComponent } from '../../features/dashboard/dashboard.component';
import { TrackerComponent } from '../../features/tracker/tracker.component';
import { NavComponent } from './nav.component';

import { UserService } from '../../features/auth/services/user.service';

import { TimePipe } from '../../shared/pipes/time.pipe';

import * as userActions from '../../features/auth/actions/user.actions';

import * as fromAuth from '../../features/auth/reducers/root.reducer';
import * as fromRoot from '../../reducers/root.reducer';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let store: Store<fromAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavComponent,
        TrackerComponent,
        DashboardComponent,
        TimePipe
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers)
        })
      ],
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should have nav banner link with correct href', async(() => {
    const navBannerLink = fixture.debugElement.query(By.css('#navBannerLink'));
    const href = navBannerLink.nativeElement.getAttribute('href');
    expect(href).toBe('/app');
  }));

  it('Should have profile link with correct href', async(() => {
    const profileLink = fixture.debugElement.query(By.css('.user .info a'));
    const href = profileLink.nativeElement.getAttribute('href');
    expect(href).toBe('/app/profile');
  }));

  it('Should have nav tracker link with correct href', async(() => {
    const navTrackerLink = fixture.debugElement.query(By.css('#navTrackerLink'));
    const href = navTrackerLink.nativeElement.getAttribute('href');
    expect(href).toBe('/app/tracker');
  }));

  it('Should have nav dashboard link with correct href', async(() => {
    const navDashboardLink = fixture.debugElement.query(By.css('#navDashboardLink'));
    const href = navDashboardLink.nativeElement.getAttribute('href');
    expect(href).toBe('/app/dashboard');
  }));

  it('Should have nav library link with correct href', async(() => {
    const navLibraryLink = fixture.debugElement.query(By.css('#navLibraryLink'));
    const href = navLibraryLink.nativeElement.getAttribute('href');
    expect(href).toBe('/app/library');
  }));

  it('Should have nav completion link with correct href', async(() => {
    const navCompletionLink = fixture.debugElement.query(By.css('#navCompletionLink'));
    const href = navCompletionLink.nativeElement.getAttribute('href');
    expect(href).toBe('/app/completion');
  }));

  it('Should dispatch Logout on logout button click', async(() => {
    const action = new userActions.Logout();
    const button = fixture.nativeElement.querySelector('#logoutButton');

    button.click();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  describe('Mobile', () => {
    describe('Nav Hidden', () => {
      it('Should change hideNavContents to false when menu icon clicked', () => {
        const navtoggleMenuIcon = fixture.debugElement.query(By.css('.nav .main .banner .menu'));
        navtoggleMenuIcon.nativeElement.click();
        fixture.detectChanges();

        expect(component.hideNavContents).toBe(false);
      });

      it('Should show menu open icon', () => {
        const navMenuOpenIcon = fixture.debugElement.query(By.css('#showMenuIcon'));
        expect(navMenuOpenIcon).toBeTruthy();
      });

      it('Should not show menu close icon', () => {
        const navMenuCloseIcon = fixture.debugElement.query(By.css('#hideMenuIcon'));
        expect(navMenuCloseIcon).toBeNull();
      });
    });

    describe('Nav Shown', () => {
      it('Should change hideNavContents to true when menu icon clicked', () => {
        const navtoggleMenuIcon = fixture.debugElement.query(By.css('.nav .main .banner .menu'));
        component.hideNavContents = false;
        navtoggleMenuIcon.nativeElement.click();
        fixture.detectChanges();

        expect(component.hideNavContents).toBe(true);
      });

      it('Should show menu close icon', () => {
        component.hideNavContents = false;
        fixture.detectChanges();
        const navMenuCloseIcon = fixture.debugElement.query(By.css('#hideMenuIcon'));
        expect(navMenuCloseIcon).toBeTruthy();
      });

      it('Should not show menu open icon', () => {
        component.hideNavContents = false;
        fixture.detectChanges();
        const navMenuOpenIcon = fixture.debugElement.query(By.css('#showMenuIcon'));
        expect(navMenuOpenIcon).toBeNull();
      });
    });
  });
});
