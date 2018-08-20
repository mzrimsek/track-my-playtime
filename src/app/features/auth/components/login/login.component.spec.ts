import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from './login.component';

import * as actions from '../../actions/user.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromAuth from '../../reducers/root.reducer';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<fromAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        ForgotPasswordComponent
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers)
        }),
        RouterTestingModule.withRoutes([
          {
            path: 'forgotPassword',
            component: ForgotPasswordComponent
          }
        ]),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should dispatch Get User', async(() => {
    const action = new actions.GetUser();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should dispatch Google Login when GoogleAuth event emitted', async(() => {
    const action = new actions.GoogleLogin();
    const form = fixture.nativeElement.querySelector('app-auth-auth-form');

    form.dispatchEvent(new Event('googleAuth'));

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should dispatch Email Login when EmailAuth event emitted', async(() => {
    const email = 'email@email.com';
    const password = 'password';
    const action = new actions.EmailLogin(email, password);
    const form = fixture.debugElement.query(By.css('app-auth-auth-form'));

    form.triggerEventHandler('emailAuth', {
      email,
      password
    });

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  describe('Forgot Password Link', () => {
    let forgotPasswordLink: any;

    beforeEach(async(() => {
      forgotPasswordLink = fixture.debugElement.query(By.css('#forgotPasswordLink'));
    }));

    it('Should have correct href', async(() => {
      const href = forgotPasswordLink.nativeElement.getAttribute('href');
      expect(href).toBe('/forgotPassword');
    }));
  });
});
