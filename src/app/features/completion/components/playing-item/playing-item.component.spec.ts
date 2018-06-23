import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { PlayingItemComponent } from './playing-item.component';

import { UserService } from '../../../auth/services/user.service';

import { TimePipe } from '../../../../shared/pipes/time.pipe';

import * as markCompleteActions from '../../actions/mark-complete.actions';
import * as progressActions from '../../actions/progress.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromCompletion from '../../reducers/root.reducer';

describe('PlayingItemComponent', () => {
  let store: Store<fromRoot.State>;
  let component: PlayingItemComponent;
  let fixture: ComponentFixture<PlayingItemComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlayingItemComponent,
        TimePipe
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'completion': combineReducers(fromCompletion.reducers)
        })
      ],
      providers: [{ provide: UserService, useValue: userServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    userService = TestBed.get(UserService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(PlayingItemComponent);
    component = fixture.componentInstance;
    component.displayData = {
      item: {
        id: '1',
        startEntryId: 'start 1',
        endEntryId: ''
      },
      startEntryData: {
        id: 'start 1',
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 6000,
        dateRange: [new Date(3000), new Date(6000)]
      },
      timePlayed: 3,
      endDates: [],
      markComplete: {
        id: '1',
        showExtra: false,
        endTime: 0
      }
    };
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should call UserService getUser', () => {
    expect(userService.getUser).toHaveBeenCalled();
  });

  describe('Show Extra button clicked', () => {
    it('Should dispatch SetShowExtra with true when showExtra is false', () => {
      const toggleShowExtraButton = fixture.nativeElement.querySelector('#markCompletedShowExtra');
      toggleShowExtraButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(new markCompleteActions.SetShowExtra('1', true));
    });

    it('Should dispatch SetShowExtra with false when showExtra is true', () => {
      component.displayData.markComplete.showExtra = true;
      fixture.detectChanges();
      const toggleShowExtraButton = fixture.nativeElement.querySelector('#markCompletedShowExtra');

      toggleShowExtraButton.click();

      expect(store.dispatch).toHaveBeenCalledWith(new markCompleteActions.SetShowExtra('1', false));
    });
  });

  it('Should dispatch RemoveProgressItem when remove button is clicked', () => {
    const removeButton = fixture.nativeElement.querySelector('#markCompletedRemove');
    removeButton.click();
    expect(store.dispatch).toHaveBeenCalledWith(new progressActions.RemoveProgressItem(testUserId, '1'));
  });

  it('Should dispatch SetEndTime when end time select changes', () => {
    fail();
  });

  describe('Mark Complete button clicked', () => {
    it('Should dispatch Error when no matching history item', () => {
      fail();
    });

    it('Should dispatch MarkComplete when there is a matching history item', () => {
      fail();
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
