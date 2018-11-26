import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { CompletedItemComponent } from './completed-item.component';

import { UserService } from '../../../auth/services/user.service';

import { TimePipe } from '../../../../shared/pipes/time.pipe';

import * as progressActions from '../../../../shared/actions/progress.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromCompletion from '../../reducers/root.reducer';

import { user } from '../../../../test-helpers';

describe('CompletedItemComponent', () => {
  let store: Store<fromRoot.State>;
  let component: CompletedItemComponent;
  let fixture: ComponentFixture<CompletedItemComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompletedItemComponent,
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

    fixture = TestBed.createComponent(CompletedItemComponent);
    component = fixture.componentInstance;
    component.displayData = {
      item: {
        id: '1',
        startEntryId: 'start 1',
        endEntryId: 'end 1',
        notes: ''
      },
      completedItem: {
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 8000,
        timePlayed: 3
      }
    };
    component.editNotes = false;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should call UserService getUser', async(() => {
    expect(userService.getUser).toHaveBeenCalled();
  }));

  it('Should dispatch RemoveProgressItem when remove button is clicked', async(() => {
    const removeButton = fixture.nativeElement.querySelector('button');
    removeButton.click();
    expect(store.dispatch).toHaveBeenCalledWith(new progressActions.RemoveProgressItem(user.mockUser.uid, '1'));
  }));

  describe('Edit notes', () => {
    describe('When editNotes is true', () => {
      beforeEach(async(() => {
        component.editNotes = true;
        fixture.detectChanges();
      }));

      it('Should not display no edit', async(() => {
        const noEdit = fixture.nativeElement.querySelector('.completed-item .info .notes .no-edit');
        expect(noEdit).toBeFalsy();
      }));

      it('Should display edit display name component', async(() => {
        const editNotes = fixture.nativeElement.querySelector('.completed-item .info .notes app-completion-set-notes');
        expect(editNotes).toBeTruthy();
      }));

      it('Should set editNotes to false on finishEdit', () => {
        const editNotes = fixture.nativeElement.querySelector('.completed-item .info .notes app-completion-set-notes');
        editNotes.dispatchEvent(new Event('finishEdit'));
        expect(component.editNotes).toBe(false);
      });
    });

    describe('When editNotes is false', () => {
      it('Should display no edit', async(() => {
        const noEdit = fixture.nativeElement.querySelector('.completed-item .info .notes .no-edit');
        expect(noEdit).toBeTruthy();
      }));

      it('Should not display set notes component', async(() => {
        const editDisplayName = fixture.nativeElement.querySelector('.completed-item .info .notes app-completion-set-notes');
        expect(editDisplayName).toBeFalsy();
      }));

      it('Should set editNotes to true when edit button is clicked', async(() => {
        const editButton = fixture.nativeElement.querySelector('.completed-item .info .notes .no-edit button');
        editButton.click();
        expect(component.editNotes).toBe(true);
      }));
    });
  });
});
