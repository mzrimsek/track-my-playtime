import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { RegisterComponent } from './register.component';

import * as actions from '../../actions/user.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromAuth from '../../reducers/root.reducer';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: Store<fromAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    spyOn(store, 'select').and.callThrough();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should select logging in', async(() => {
    expect(store.select).toHaveBeenCalledWith(fromAuth._selectStatusLoggingIn);
  }));

  it('Should select validation message', async(() => {
    expect(store.select).toHaveBeenCalledWith(fromAuth._selectStatusValidationMessage);
  }));

  it('Should dispatch Google Login when GoogleAuth event emitted', async(() => {
    const action = new actions.GoogleLogin();
    const form = fixture.nativeElement.querySelector('app-auth-auth-form');

    form.dispatchEvent(new Event('googleAuth'));

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should dispatch Facebook Login when FacebookAuth event is emitted', async(() => {
    const action = new actions.FacebookLogin();
    const form = fixture.nativeElement.querySelector('app-auth-auth-form');

    form.dispatchEvent(new Event('facebookAuth'));

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));

  it('Should dispatch SignUp when EmailAuth event emitted', async(() => {
    const email = 'email@email.com';
    const password = 'password';
    const action = new actions.SignUp(email, password);
    const form = fixture.debugElement.query(By.css('app-auth-auth-form'));

    form.triggerEventHandler('emailAuth', {
      email,
      password
    });

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));
});
