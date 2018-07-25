import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { addMinutes } from 'date-fns';

import { LockedHistoryEntryComponent } from './locked-history-entry.component';

import { UserService } from '../../../auth/services/user.service';
import { TimerService } from '../../services/timer.service';

import { ElapsedTimePipe } from '../../../../shared/pipes/elapsed-time.pipe';

import * as timerActions from '../../actions/timer.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromTracker from '../../reducers/root.reducer';

import { HistoryListItem } from '../../../../shared/models';
import { TimerInfo } from '../../models';

import { tracker, user } from '../../../../test-helpers';

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
