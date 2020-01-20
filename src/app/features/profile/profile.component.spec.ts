import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromRoot from 'app/reducers/root.reducer';
import { user } from 'app/test-helpers';
import * as userActions from 'features/auth/actions/user.actions';

import { ProfileComponent } from './profile.component';

import { UserService } from 'features/auth/services/user.service';

import * as fromProfile from './reducers/root.reducer';

describe('ProfileComponent', () => {
  let store: Store<fromRoot.State>;
  let userService: UserService;
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'profile': combineReducers(fromProfile.reducers),
        })
      ],
      providers: [{ provide: UserService, useValue: user.userServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    userService = TestBed.get(UserService);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should call UserService getUserInfo', async(() => {
    expect(userService.getUserInfo).toHaveBeenCalled();
  }));

  describe('When provider is password', () => {
    beforeEach(async(() => {
      component.userInfo = {
        ...user.mockUserInfo,
        provider: 'PASSWORD'
      };
      fixture.detectChanges();
    }));

    it('Should show account section', async(() => {
      const accountSection = fixture.nativeElement.querySelector('.account');
      expect(accountSection).toBeTruthy();
    }));

    describe('When Reset Password button is clicked', () => {
      beforeEach(async(() => {
        const resetPasswordButton = fixture.nativeElement.querySelector('.account button');
        resetPasswordButton.click();
      }));

      it('Should dispatch ResetPassword', async(() => {
        const action = new userActions.ResetPassword(user.mockUserInfo.email);
        expect(store.dispatch).toHaveBeenCalledWith(action);
      }));

      it('Should set message', async(() => {
        const message = `A password reset email has been sent to ${user.mockUserInfo.email}`;
        expect(component.message).toBe(message);
      }));
    });
  });

  it('Should not show account section when provider is not password', async(() => {
    const accountSection = fixture.nativeElement.querySelector('.account');
    expect(accountSection).toBeFalsy();
  }));

  describe('Edit display name', () => {
    describe('When editName is true', () => {
      beforeEach(async(() => {
        component.editName = true;
        fixture.detectChanges();
      }));

      it('Should not display no edit', async(() => {
        const noEdit = fixture.nativeElement.querySelector('.profile .name .no-edit');
        expect(noEdit).toBeFalsy();
      }));

      it('Should display edit display name component', async(() => {
        const editDisplayName = fixture.nativeElement.querySelector('.profile .name app-profile-edit-display-name');
        expect(editDisplayName).toBeTruthy();
      }));

      it('Should set editName to false on finishEdit', async(() => {
        const editDisplayName = fixture.nativeElement.querySelector('.profile .name app-profile-edit-display-name');
        editDisplayName.dispatchEvent(new Event('finishEdit'));
        expect(component.editName).toBe(false);
      }));
    });

    describe('When editName is false', () => {
      it('Should display no edit', async(() => {
        const noEdit = fixture.nativeElement.querySelector('.profile .name .no-edit');
        expect(noEdit).toBeTruthy();
      }));

      it('Should not display edit display name component', async(() => {
        const editDisplayName = fixture.nativeElement.querySelector('.profile .name app-profile-edit-display-name');
        expect(editDisplayName).toBeFalsy();
      }));

      it('Should set editName to true when edit button is clicked', async(() => {
        const editButton = fixture.nativeElement.querySelector('.profile .name .no-edit button');
        editButton.click();
        expect(component.editName).toBe(true);
      }));
    });
  });
});
