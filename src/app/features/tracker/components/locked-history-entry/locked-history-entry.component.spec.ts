import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromRoot from 'app/reducers/root.reducer';
import { tracker, user } from 'app/test-helpers';
import { addMinutes } from 'date-fns';
import * as fromTracker from 'features/tracker/reducers/root.reducer';
import * as timerActions from 'shared/actions/timer.actions';

import { LockedHistoryEntryComponent } from './locked-history-entry.component';

import { UserService } from 'features/auth/services/user.service';
import { TimerService } from 'features/tracker/services/timer.service';

import { ElapsedTimePipe } from 'shared/pipes/elapsed-time.pipe';

import { HistoryListItem, TimerInfo } from 'shared/models';

describe('LockedHistoryEntryComponent', () => {
  let store: Store<fromRoot.State>;
  let userService: UserService;
  let component: LockedHistoryEntryComponent;
  let fixture: ComponentFixture<LockedHistoryEntryComponent>;
  let timerService: TimerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LockedHistoryEntryComponent,
        ElapsedTimePipe
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tracker': combineReducers(fromTracker.reducers)
        })
      ],
      providers: [
        { provide: UserService, useValue: user.userServiceStub },
        { provide: TimerService, useValue: tracker.timerServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    userService = TestBed.get(UserService);
    timerService = TestBed.get(TimerService);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(LockedHistoryEntryComponent);
    component = fixture.componentInstance;
    component.item = testItem;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should call UserService getUser', async(() => {
    expect(userService.getUser).toHaveBeenCalled();
  }));

  describe('Quickstart Button Clicked', () => {
    let quickstartButton: any;

    beforeEach(async(() => {
      quickstartButton = fixture.nativeElement.querySelector('.primary-action .quickstart');
      tracker.timerServiceStub.getNowTime.and.returnValue(start.getTime());
    }));

    it('Should dispatch SetTimerInfo with correct info', async(() => {
      const action = new timerActions.SetTimerInfo(timerInfo);
      quickstartButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));

    it('Should call TimerService setTimer', async(() => {
      quickstartButton.click();
      expect(timerService.setTimer).toHaveBeenCalledWith(user.mockUser.uid, timerInfo);
    }));
  });
});

const start = new Date();
const end = addMinutes(start, 15);
const testItem: HistoryListItem = {
  id: '1',
  game: 'some game',
  platform: 'some platform',
  startTime: start.getTime(),
  endTime: end.getTime(),
  dateRange: [start, end],
  locked: true
};
const timerInfo: TimerInfo = {
  game: testItem.game,
  platform: testItem.platform,
  startTime: start.getTime()
};
