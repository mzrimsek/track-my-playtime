import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { ForgotPasswordComponent } from './forgot-password.component';

import * as actions from '../../actions/user.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromAuth from '../../reducers/root.reducer';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let store: Store<fromAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      providers: [FormBuilder],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers)
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('Invalid Form', () => {
    it('Should be invalid when empty', async(() => {
      expect(component.passwordForm.valid).toBe(false);
    }));

    it('Should not dispatch ResetPassword', async(() => {
      component.resetPassword();
      expect(store.dispatch).not.toHaveBeenCalled();
    }));
  });

  describe('Valid Form', () => {
    beforeEach(async(() => {
      component.passwordForm.controls['email'].setValue('email@email.com');
    }));

    it('Should be valid when filled out', async(() => {
      expect(component.passwordForm.valid).toBe(true);
    }));

    describe('When resetPassword is called', () => {
      it('Should dispatch ResetPassword with correct email', async(() => {
        component.resetPassword();
        expect(store.dispatch).toHaveBeenCalledWith(new actions.ResetPassword('email@email.com'));
      }));

      it('Should set message', async(() => {
        component.resetPassword();
        expect(component.message).toBe('A password reset email has been sent to email@email.com');
      }));
    });
  });
});
