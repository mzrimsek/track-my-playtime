import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromRoot from 'app/reducers/root.reducer';
import { user } from 'app/test-helpers';
import * as fromCompletion from 'features/completion/reducers/root.reducer';
import * as progressActions from 'shared/actions/progress.actions';
import * as fromShared from 'shared/reducers/root.reducer';

import { SetNotesComponent } from './set-notes.component';

import { UserService } from 'features/auth/services/user.service';

describe('SetNotesComponent', () => {
  let store: Store<fromRoot.State>;
  let userService: UserService;
  let component: SetNotesComponent;
  let fixture: ComponentFixture<SetNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetNotesComponent],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'completion': combineReducers(fromCompletion.reducers),
          'shared': combineReducers(fromShared.reducers)
        })
      ],
      providers: [{ provide: UserService, useValue: user.userServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    userService = TestBed.get(UserService);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(SetNotesComponent);
    component = fixture.componentInstance;
    component.itemId = 'someItemId';
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should call userService getUser', async(() => {
    expect(userService.getUser).toHaveBeenCalled();
  }));

  it('Should emit finishEdit when emitFinishEdit is called', async(() => {
    spyOn(component.finishEdit, 'emit');
    component.emitFinishEdit();
    expect(component.finishEdit.emit).toHaveBeenCalled();
  }));

  it('Should call emitFinishEdit when cancel button is clicked', async(() => {
    const cancelButton = fixture.nativeElement.querySelector('.actions .cancel');
    spyOn(component, 'emitFinishEdit');

    cancelButton.click();

    expect(component.emitFinishEdit).toHaveBeenCalled();
  }));

  it('Should dispatch SetNotes when confirm button is clicked', async(() => {
    const notes = 'some notes';
    const confirmButton = fixture.nativeElement.querySelector('.actions .confirm');
    const setNotesInput = fixture.nativeElement.querySelector('input');
    setNotesInput.value = notes;
    const action = new progressActions.SetNotes(user.mockUser.uid, {
      itemId: component.itemId,
      notes
    });

    confirmButton.click();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should call emitFinishEdit when confirm button is clicked', async(() => {
    const confirmButton = fixture.nativeElement.querySelector('.actions .confirm');
    spyOn(component, 'emitFinishEdit');

    confirmButton.click();

    expect(component.emitFinishEdit).toHaveBeenCalled();
  }));
});
