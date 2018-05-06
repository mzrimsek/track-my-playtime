import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { TimerComponent } from './timer.component';

import { UserService } from '../../../auth/services/user.service';
import { TimerService } from '../../services/timer.service';

import { ElapsedTimePipe } from '../../../../shared/pipes/elapsed-time.pipe';

import * as actions from '../../actions/timer.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromTracker from '../../reducers/root.reducer';

import { TimerInfo } from '../../models';

describe('TimerComponent', () => {
  let store: Store<fromRoot.State>;
  let userService: UserService;
  let timerService: TimerService;
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimerComponent,
        ElapsedTimePipe
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tracker': combineReducers(fromTracker.reducers)
        })
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: TimerService, useValue: timerServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    userService = TestBed.get(UserService);
    timerService = TestBed.get(TimerService);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    component.info = testInfo;
    component.platformsOptions = testPlatforms;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should call UserService getUser', () => {
    expect(userService.getUser).toHaveBeenCalled();
  });

  describe('Start Button Click', () => {
    const start = new Date();
    const action = new actions.SetStartTime(start.getTime());
    const startButton = fixture.nativeElement.querySelector('.primary-action .start');

    beforeEach(async(() => {
      component.currentTime = start.getTime();
      fixture.detectChanges();
    }));

    it('Should dispatch SetStartTime', () => {
      startButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('Should dispatch TimerService setTimer', () => {
      startButton.click();
      expect(timerService.setTimer).toHaveBeenCalledWith(testUserId, {
        ...testInfo,
        startTime: start.getTime()
      });
    });
  });

  it('Should call openDateTimePicker when elapsed time is clicked', () => {
    const timeStartEndEl = fixture.nativeElement.querySelector('.time > div');
    spyOn(component, 'openDateTimePicker');

    timeStartEndEl.click();

    expect(component.openDateTimePicker).toHaveBeenCalled();
  });
});

const testUserId = 'some id';
const userServiceStub = {
  getUser: jasmine.createSpy('getUser').and.returnValue({
    uid: testUserId,
    displayName: 'Jim Bob',
    email: 'jimbob@jimbob.com',
    photoURL: 'jimbob.com/jimbob.png'
  })
};

const timerServiceStub = {
  setTimer: jasmine.createSpy('setTimer'),
  setGame: jasmine.createSpy('setGame'),
  setPlatform: jasmine.createSpy('setPlatform'),
  setStartTime: jasmine.createSpy('setStartTime'),
  resetTimer: jasmine.createSpy('resetTimer')
};

const testInfo: TimerInfo = {
  game: 'some game',
  platform: 'some platform',
  startTime: 0
};

const testPlatforms = [
  'PS4',
  'Xbox One'
];
