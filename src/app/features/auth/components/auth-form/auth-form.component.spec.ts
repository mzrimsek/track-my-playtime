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

  it('Should call emitGoogleAuth on Google button click', async(() => {
    const button = fixture.nativeElement.querySelector('#google-auth');

    spyOn(component, 'emitGoogleAuth');
    button.click();

    expect(component.emitGoogleAuth).toHaveBeenCalled();
  }));

  describe('Email Form', () => {
    it('Should be invalid when empty', async(() => {
      expect(component.authForm.valid).toBe(false);
    }));

    it('Should be valid when filled out', async(() => {
      component.authForm.controls['email'].setValue('email@email.com');
      component.authForm.controls['password'].setValue('password');
      expect(component.authForm.valid).toBe(true);
    }));
  });
});
