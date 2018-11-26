import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { EditDisplayNameComponent } from './edit-display-name.component';

import { UserService } from '../../../auth/services/user.service';

import * as profileActions from '../../actions/profile.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromProfile from '../../reducers/root.reducer';

import { user } from '../../../../test-helpers';

describe('EditDisplayNameComponent', () => {
  let store: Store<fromRoot.State>;
  let userService: UserService;
  let component: EditDisplayNameComponent;
  let fixture: ComponentFixture<EditDisplayNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditDisplayNameComponent],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'profile': combineReducers(fromProfile.reducers)
        })
      ],
      providers: [{ provide: UserService, useValue: user.userServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    userService = TestBed.get(UserService);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(EditDisplayNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

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

  it('Should dispatch SetProfileDisplayName when confirm button is clicked', async(() => {
    const displayName = 'some name';
    const confirmButton = fixture.nativeElement.querySelector('.actions .confirm');
    const displayNameInput = fixture.nativeElement.querySelector('input');
    displayNameInput.value = displayName;
    const action = new profileActions.SetProfileDisplayName(user.mockUser.uid, displayName);

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
