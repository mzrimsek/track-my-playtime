import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { addMinutes } from 'date-fns';

import { HistoryEntryComponent } from './history-entry.component';

import { UserService } from '../../../auth/services/user.service';

import { ElapsedTimePipe } from '../../../../shared/pipes/elapsed-time.pipe';

import * as actions from '../../../../shared/actions/history.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromTracker from '../../reducers/root.reducer';

import {
    HistoryListItem, UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload,
    UpdateHistoryItemTimesPayload
} from '../../../../shared/models';

import { user } from '../../../../testing/testing-helpers';

describe('HistoryEntryComponent', () => {
  let store: Store<fromRoot.State>;
  let userService: UserService;
  let component: HistoryEntryComponent;
  let fixture: ComponentFixture<HistoryEntryComponent>;

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
      providers: [{ provide: UserService, useValue: user.userServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    userService = TestBed.get(UserService);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(HistoryEntryComponent);
    component = fixture.componentInstance;
    component.item = testItem;
    component.platformsOptions = testPlatforms;
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
    const action = new actions.UpdateGame(user.mockUser.uid, payload);
    const gameEl = fixture.nativeElement.querySelector('.game ng-select');

    component.game = game;
    gameEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should dispatch UpdatePlatform when platform option changes', async(() => {
    const payload: UpdateHistoryItemPlatformPayload = {
      itemId: testItem.id,
      platform: testPlatforms[0]
    };
    const action = new actions.UpdatePlatform(user.mockUser.uid, payload);
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
    const action = new actions.UpdateElapsedTime(user.mockUser.uid, payload);
    const dateTimeEl = fixture.nativeElement.querySelector('.date-time-picker input');

    dateTimeEl.value = new Date(payload.startTime) + '~' + new Date(payload.endTime);
    dateTimeEl.dispatchEvent(new Event('dateTimeChange'));
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should dispatch RemoveHistoryItem when remove button is clicked', async(() => {
    const action = new actions.RemoveHistoryItem(user.mockUser.uid, testItem.id);
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

const testPlatforms = [
  'PS4',
  'Xbox One'
];
