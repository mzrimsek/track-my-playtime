import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { combineReducers, StoreModule } from '@ngrx/store';

import { DashboardComponent } from '../../features/dashboard/dashboard.component';
import { TrackerComponent } from '../../features/tracker/tracker.component';
import { NavComponent } from './nav.component';

import { UserService } from '../../features/auth/services/user.service';

import { TimePipe } from '../../shared/pipes/time.pipe';

import * as fromAuth from '../../features/auth/reducers/root.reducer';
import * as fromRoot from '../../reducers/root.reducer';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavComponent,
        TrackerComponent,
        DashboardComponent,
        TimePipe
      ],
      imports: [
        RouterTestingModule.withRoutes([
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
              }
            ]
          }
        ]),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers)
        })
      ],
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));
});
