import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { AuthFormComponent } from './auth-form.component';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFormComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    component.trackingCategory = 'test';
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should emith googleAuth when emitGoogleAuth is called', async(() => {
    spyOn(component.googleAuth, 'emit');
    component.emitGoogleAuth();
    expect(component.googleAuth.emit).toHaveBeenCalled();
  }));

  describe('Email Form', () => {
    describe('Invalid Form', () => {
      it('Should be invalid when empty', async(() => {
        expect(component.authForm.valid).toBe(false);
      }));

      it('Should not emit emailAuth event emitEmailAuth is called', () => {
        spyOn(component.emailAuth, 'emit');
        component.emitEmailAuth();
        expect(component.emailAuth.emit).not.toHaveBeenCalled();
      });
    });

    describe('Valid form', () => {
      beforeEach(async(() => {
        component.authForm.controls['email'].setValue('email@email.com');
        component.authForm.controls['password'].setValue('password');
      }));

      it('Should be valid when filled out', async(() => {
        expect(component.authForm.valid).toBe(true);
      }));

      it('Should emit emailAuth event emitEmailAuth is called', () => {
        spyOn(component.emailAuth, 'emit');
        component.emitEmailAuth();
        expect(component.emailAuth.emit).toHaveBeenCalledWith({
          email: 'email@email.com',
          password: 'password'
        });
      });
    });
  });
});
