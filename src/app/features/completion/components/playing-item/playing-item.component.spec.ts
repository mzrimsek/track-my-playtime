import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as appActions from 'app/actions/app.actions';
import * as fromRoot from 'app/reducers/root.reducer';
import { completion, user } from 'app/test-helpers';
import * as markCompleteActions from 'features/completion/actions/mark-complete.actions';
import * as fromCompletion from 'features/completion/reducers/root.reducer';
import * as progressActions from 'shared/actions/progress.actions';

import { PlayingItemComponent } from './playing-item.component';

import { UserService } from 'features/auth/services/user.service';

import { TimePipe } from 'shared/pipes/time.pipe';

describe('PlayingItemComponent', () => {
  let store: Store<fromRoot.State>;
  let component: PlayingItemComponent;
  let fixture: ComponentFixture<PlayingItemComponent>;
  let userService: UserService;

  const initTests = () => {
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
      providers: [{ provide: UserService, useValue: user.userServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    userService = TestBed.get(UserService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(PlayingItemComponent);
    component = fixture.componentInstance;
    component.displayData = completion.testPlayingDisplayData;
    fixture.detectChanges();
  };

  describe('Render', () => {
    beforeEach(async(() => {
      initTests();
    }));

    it('Should create the component', async(() => {
      expect(component).toBeTruthy();
    }));

    it('Should call UserService getUser', async(() => {
      expect(userService.getUser).toHaveBeenCalled();
    }));
  });

  describe('When show extra is false', () => {
    beforeEach(async(() => {
      initTests();
    }));

    it('Should display extra section open button', async(() => {
      const toggleShowExtraButton = fixture.nativeElement.querySelector('.actions .complete');
      expect(toggleShowExtraButton).toBeTruthy();
    }));

    it('Should not display extra section close button', async(() => {
      const toggleShowExtraButton = fixture.nativeElement.querySelector('.actions .close');
      expect(toggleShowExtraButton).toBeNull();
    }));

    it('Should dispatch SetShowExtra with true when markComplete button clicked', async(() => {
      const toggleShowExtraButton = fixture.nativeElement.querySelector('.actions .complete');
      toggleShowExtraButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(new markCompleteActions.SetShowExtra('1', true));
    }));

    it('Should dispatch RemoveProgressItem when remove button is clicked', async(() => {
      const removeButton = fixture.nativeElement.querySelector('.actions .remove');
      removeButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(new progressActions.RemoveProgressItem(user.mockUser.uid, '1'));
    }));

    it('Should not display extra section', async(() => {
      const extraSection = fixture.nativeElement.querySelector('.extra');
      expect(extraSection).toBeNull();
    }));
  });

  describe('When show extra is true', () => {
    beforeEach(async(() => {
      completion.testPlayingDisplayData.markComplete.showExtra = true;
      initTests();
    }));

    it('Should display extra section close button', async(() => {
      const toggleShowExtraButton = fixture.nativeElement.querySelector('.actions .close');
      expect(toggleShowExtraButton).toBeTruthy();
    }));

    it('Should not display extra section open button', async(() => {
      const toggleShowExtraButton = fixture.nativeElement.querySelector('.actions .complete');
      expect(toggleShowExtraButton).toBeNull();
    }));

    it('Should dispatch SetShowExtra with false when markComplete button clicked', async(() => {
      const toggleShowExtraButton = fixture.nativeElement.querySelector('.actions .close');
      toggleShowExtraButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(new markCompleteActions.SetShowExtra('1', false));
    }));

    it('Should display extra section', async(() => {
      const extraSection = fixture.nativeElement.querySelector('.extra');
      expect(extraSection).toBeTruthy();
    }));

    it('Should dispatch SetEndTime when end time select changes', async(() => {
      const endTimeSelect = fixture.nativeElement.querySelector('.playing-item .extra select');

      endTimeSelect.selectedIndex = 1;
      endTimeSelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(new markCompleteActions.SetEndTime('1', 6000));
    }));

    describe('Mark Complete button clicked', () => {
      let markCompleteButton: any;

      beforeEach(async(() => {
        markCompleteButton = fixture.nativeElement.querySelector('.extra .complete button');
        markCompleteButton.disabled = false;
      }));

      it('Should dispatch Error when no matching history item', async(() => {
        completion.testPlayingDisplayData.markComplete.endTime = 8000;
        fixture.detectChanges();

        markCompleteButton.click();

        expect(store.dispatch).toHaveBeenCalledWith(new appActions.Error(progressActions.MARK_COMPLETE, 'No matching history item found.'));
      }));

      it('Should dispatch MarkComplete when there is a matching history item', async(() => {
        component.gameGroupings = [{
          key: 'some game',
          historyItems: [{
            id: 'start 1',
            game: 'some game',
            platform: 'some platform',
            startTime: 3000,
            endTime: 6000,
            dateRange: [new Date(3000), new Date(6000)],
            locked: false
          }],
          totalTime: 3
        }];
        completion.testPlayingDisplayData.markComplete.endTime = 6000;
        fixture.detectChanges();

        markCompleteButton.click();

        expect(store.dispatch).toHaveBeenCalledWith(new progressActions.MarkComplete(user.mockUser.uid, {
          itemId: '1',
          endEntryId: 'start 1'
        }));
      }));
    });
  });
});
