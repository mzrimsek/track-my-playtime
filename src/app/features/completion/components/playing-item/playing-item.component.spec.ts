import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { PlayingItemComponent } from './playing-item.component';

import { UserService } from '../../../auth/services/user.service';

import { TimePipe } from '../../../../shared/pipes/time.pipe';

import * as appActions from '../../../../actions/app.actions';
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
      endDates: [6000],
      markComplete: {
        id: '1',
        showExtra: false,
        endTime: 0
      }
    };
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should call UserService getUser', async(() => {
    expect(userService.getUser).toHaveBeenCalled();
  }));

  describe('When show extra is false', () => {
    it('Should dispatch SetShowExtra with true when markComplete button clicked', async(() => {
      const toggleShowExtraButton = fixture.nativeElement.querySelector('#markCompletedShowExtra');
      toggleShowExtraButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(new markCompleteActions.SetShowExtra('1', true));
    }));

    it('Should not display extra section', async(() => {
      const extraSection = fixture.nativeElement.querySelector('.extra');
      expect(extraSection).toBeFalsy();
    }));
  });

  describe('When show extra is true', () => {
    beforeEach(async(() => {
      component.displayData.markComplete.showExtra = true;
      fixture.detectChanges();
    }));

    it('Should dispatch SetShowExtra with false when markComplete button clicked', async(() => {
      const toggleShowExtraButton = fixture.nativeElement.querySelector('#markCompletedShowExtra');
      toggleShowExtraButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(new markCompleteActions.SetShowExtra('1', false));
    }));

    it('Should display extra section', async(() => {
      const extraSection = fixture.nativeElement.querySelector('.extra');
      expect(extraSection).toBeTruthy();
    }));

    it('Should dispatch SetEndTime when end time select changes', async(() => {
      const endTimeSelect = fixture.nativeElement.querySelector('.extra select');

      endTimeSelect.selectedIndex = 1;
      endTimeSelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(new markCompleteActions.SetEndTime('1', 6000));
    }));

    describe('Mark Complete button clicked', () => {
      let markCompleteButton: any;

      beforeEach(async(() => {
        markCompleteButton = fixture.nativeElement.querySelector('#markCompletedSave');
      }));

      it('Should dispatch Error when no matching history item', async(() => {
        component.displayData.markComplete.endTime = 8000;
        fixture.detectChanges();

        markCompleteButton.click();

        expect(store.dispatch).toHaveBeenCalledWith(new appActions.Error(progressActions.MARK_COMPLETE, 'No matching history item found.'));
      }));

      it('Should dispatch MarkComplete when there is a matching history item', async(() => {
        component.displayData.markComplete.endTime = 6000;
        fixture.detectChanges();

        markCompleteButton.click();

        expect(store.dispatch).toHaveBeenCalledWith(new progressActions.MarkComplete(testUserId, {
          itemId: '1',
          endEntryId: 'start 1'
        }));
      }));
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
