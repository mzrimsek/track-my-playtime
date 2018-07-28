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

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should call emitGoogleAuth on Google button click', async(() => {
    const button = fixture.nativeElement.querySelector('#google-auth');

    spyOn(component, 'emitGoogleAuth');
    button.click();

    expect(component.emitGoogleAuth).toHaveBeenCalled();
  }));

  it('Should auth button when form is invalid', async(() => {
    const button = fixture.nativeElement.querySelector('form .auth-button');
    expect(button.disabled).toBe(true);
  }));

  it('Should call emitEmailAuth on Email auth button click when form is valid', async(() => {
    const button = fixture.nativeElement.querySelector('form .auth-button');
    component.email.setValue('email@email.com');
    component.password.setValue('password');
    fixture.detectChanges();

    spyOn(component, 'emitEmailAuth');
    button.click();

    expect(component.emitEmailAuth).toHaveBeenCalled();
  }));
});
