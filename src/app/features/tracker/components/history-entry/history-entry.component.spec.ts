import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { addMinutes } from 'date-fns';

import { HistoryEntryComponent } from './history-entry.component';

import { UserService } from '../../../auth/services/user.service';

import { ElapsedTimePipe } from '../../../../shared/pipes/elapsed-time.pipe';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromTracker from '../../reducers/root.reducer';

import { HistoryListItem } from '../../models';

describe('HistoryEntryComponent', () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let store: Store<fromRoot.State>;
  let userService: UserService;

  beforeEach(async(() => {
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
});

const userServiceStub = {
  getUser: jasmine.createSpy('getUser').and.returnValue({
    uid: 'some id',
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
  platformsOptions: string[] = [];
  dateRange: Date[] = [];

  ngOnInit() { }
}
