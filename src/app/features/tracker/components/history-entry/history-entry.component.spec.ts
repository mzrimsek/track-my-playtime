import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { addMinutes } from 'date-fns';

import { HistoryEntryComponent } from './history-entry.component';

import { UserService } from '../../../auth/services/user.service';

import { ElapsedTimePipe } from '../../../../shared/pipes/elapsed-time.pipe';

import * as actions from '../../actions/history.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromTracker from '../../reducers/root.reducer';

import {
    HistoryListItem, UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload,
    UpdateHistoryItemTimesPayload
} from '../../models';

describe('HistoryEntryComponent', () => {
  let store: Store<fromRoot.State>;
  let userService: UserService;

  const initTests = () => {
    TestBed.configureTestingModule({
      declarations: [
        TestWrapperComponent,
        HistoryEntryComponent,
        ElapsedTimePipe
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tracker': combineReducers(fromTracker.reducers)
        })
      ],
      providers: [{ provide: UserService, useValue: userServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    userService = TestBed.get(UserService);

    spyOn(store, 'dispatch').and.callThrough();
  };

  describe('Wrapper Component Tests', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
      initTests();

      fixture = TestBed.createComponent(TestWrapperComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('Should create the component', async(() => {
      expect(component).toBeTruthy();
    }));

    it('Should call UserService getUser', () => {
      expect(userService.getUser).toHaveBeenCalled();
    });

    describe('Action dispatching', () => {
      it('Should dispatch UpdateGame when game text changes', () => {
        const game = 'some awesome game';
        const payload: UpdateHistoryItemGamePayload = {
          itemId: testItem.id,
          game
        };
        const action = new actions.UpdateGame(testUserId, payload);
        const gameEl = fixture.nativeElement.querySelector('.game input');

        gameEl.value = game;
        gameEl.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        expect(store.dispatch).toHaveBeenCalledWith(action);
      });

      it('Should dispatch UpdatePlatform when platform option changes', () => {
        const payload: UpdateHistoryItemPlatformPayload = {
          itemId: testItem.id,
          platform: testPlatforms[0]
        };
        const action = new actions.UpdatePlatform(testUserId, payload);
        const platformEl = fixture.nativeElement.querySelector('.platform select');

        platformEl.selectedIndex = 1;
        platformEl.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        expect(store.dispatch).toHaveBeenCalledWith(action);
      });
    });

    it('Should dispatch UpdateElaspedTime when date time value changes', () => {
      const payload: UpdateHistoryItemTimesPayload = {
        itemId: testItem.id,
        startTime: 3000,
        endTime: 6000
      };
      const action = new actions.UpdateElapsedTime(testUserId, payload);
      const dateTimeEl = fixture.nativeElement.querySelector('.date-time-picker input');

      dateTimeEl.value = '05/03/2018 11:58 PM';
      dateTimeEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('Should dispatch RemoveHistoryItem when remove button is clicked', () => {
      const action = new actions.RemoveHistoryItem(testUserId, testItem.id);
      const removeButtonEl = fixture.nativeElement.querySelector('.remove');

      removeButtonEl.click();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('Native Component Tests', () => {
    let component: HistoryEntryComponent;
    let fixture: ComponentFixture<HistoryEntryComponent>;

    beforeEach(async(() => {
      initTests();

      fixture = TestBed.createComponent(HistoryEntryComponent);
      component = fixture.componentInstance;
      component.item = testItem;
      fixture.detectChanges();
    }));

    it('Should create the component', async(() => {
      expect(component).toBeTruthy();
    }));

    it('Should call UserService getUser', () => {
      expect(userService.getUser).toHaveBeenCalled();
    });

    it('Should call openDateTimePicker when elapsed time is clicked', () => {
      const timeStartEndEl = fixture.nativeElement.querySelector('.time .start-end');
      spyOn(component, 'openDateTimePicker');

      timeStartEndEl.click();

      expect(component.openDateTimePicker).toHaveBeenCalled();
    });
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

const start = new Date();
const end = addMinutes(start, 15);
const testItem: HistoryListItem = {
  id: '1',
  game: 'some game',
  platform: 'some platform',
  startTime: start.getTime(),
  endTime: end.getTime(),
  dateRange: [start, end]
};

const testPlatforms = [
  'PS4',
  'Xbox One'
];

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-wrapper',
  template: `
    <app-tracker-history-entry [item]="item"
                               [platformsOptions]="platformsOptions"
                               [dateRange]="dateRange"></app-tracker-history-entry>
  `
})
class TestWrapperComponent implements OnInit {
  item: HistoryListItem = testItem;
  platformsOptions: string[] = testPlatforms;
  dateRange: Date[] = [];

  ngOnInit() { }
}
