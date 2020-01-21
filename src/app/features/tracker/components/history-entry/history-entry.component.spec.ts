import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromRoot from 'app/reducers/root.reducer';
import { platforms, tracker, user } from 'app/test-helpers';
import { addMinutes } from 'date-fns';
import * as fromTracker from 'features/tracker/reducers/root.reducer';
import * as historyActions from 'shared/actions/history.actions';
import * as timerActions from 'shared/actions/timer.actions';

import { HistoryEntryComponent } from './history-entry.component';

import { UserService } from 'features/auth/services/user.service';
import { TimerService } from 'features/tracker/services/timer.service';

import { ElapsedTimePipe } from 'shared/pipes/elapsed-time.pipe';

import {
    HistoryListItem, TimerInfo, UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload,
    UpdateHistoryItemTimesPayload
} from 'shared/models';

describe('HistoryEntryComponent', () => {
  let store: Store<fromRoot.State>;
  let userService: UserService;
  let component: HistoryEntryComponent;
  let fixture: ComponentFixture<HistoryEntryComponent>;
  let timerService: TimerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HistoryEntryComponent,
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

    fixture = TestBed.createComponent(HistoryEntryComponent);
    component = fixture.componentInstance;
    component.item = testItem;
    component.platformsOptions = platforms.testPlatforms;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should call UserService getUser', async(() => {
    expect(userService.getUser).toHaveBeenCalled();
  }));

  it('Should dispatch UpdateGame when game text changes', async(() => {
    const game = 'some awesome game';
    const payload: UpdateHistoryItemGamePayload = {
      itemId: testItem.id,
      game
    };
    const action = new historyActions.UpdateGame(user.mockUser.uid, payload);
    const gameEl = fixture.nativeElement.querySelector('.game ng-select');

    component.game = game;
    gameEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should dispatch UpdatePlatform when platform option changes', async(() => {
    const payload: UpdateHistoryItemPlatformPayload = {
      itemId: testItem.id,
      platform: platforms.testPlatforms[0]
    };
    const action = new historyActions.UpdatePlatform(user.mockUser.uid, payload);
    const platformEl = fixture.nativeElement.querySelector('.platform select');

    platformEl.selectedIndex = 1;
    platformEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should dispatch UpdateElaspedTime when date time value changes', async(() => {
    const payload: UpdateHistoryItemTimesPayload = {
      itemId: testItem.id,
      startTime: 3000,
      endTime: 6000
    };
    const action = new historyActions.UpdateElapsedTime(user.mockUser.uid, payload);
    const dateTimeEl = fixture.nativeElement.querySelector('.date-time-picker input');

    dateTimeEl.value = new Date(payload.startTime) + '~' + new Date(payload.endTime);
    dateTimeEl.dispatchEvent(new Event('dateTimeChange'));
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should dispatch RemoveHistoryItem when remove button is clicked', async(() => {
    const action = new historyActions.RemoveHistoryItem(user.mockUser.uid, testItem.id);
    const removeButtonEl = fixture.nativeElement.querySelector('.remove');

    removeButtonEl.click();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should call openDateTimePicker when elapsed time is clicked', async(() => {
    const timeStartEndEl = fixture.nativeElement.querySelector('.time .start-end');
    spyOn(component, 'openDateTimePicker');

    timeStartEndEl.click();

    expect(component.openDateTimePicker).toHaveBeenCalled();
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
  locked: false
};
const timerInfo: TimerInfo = {
  game: testItem.game,
  platform: testItem.platform,
  startTime: start.getTime()
};
