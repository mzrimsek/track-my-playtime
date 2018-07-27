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
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should call emitGoogleAuth on Google button click', () => {
    spyOn(component, 'emitGoogleAuth');
    const button = fixture.nativeElement.querySelector('#google-auth');
    button.click();
    expect(component.emitGoogleAuth).toHaveBeenCalled();
  });

  it('Should not call emitEmailAuth on Email auth button click when form is invalid', () => {
    spyOn(component, 'emitEmailAuth');
    const button = fixture.nativeElement.querySelector('form .auth-button');
    button.click();
    expect(component.emitEmailAuth).not.toHaveBeenCalled();
  });

  it('Should call emitEmailAuth on Email auth button click when form is valid', () => {
    spyOn(component, 'emitEmailAuth');
    const button = fixture.nativeElement.querySelector('form .auth-button');
    button.click();
    expect(component.emitEmailAuth).toHaveBeenCalled();
  });
});
