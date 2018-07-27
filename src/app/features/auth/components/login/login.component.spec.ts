import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

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
      declarations: [LoginComponent],
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
    const action = new actions.EmailLogin('email', 'password');
    const form = fixture.nativeElement.querySelector('app-auth-auth-form');

    form.dispatchEvent(new Event('emailAuth'));

    expect(store.dispatch).toHaveBeenCalledWith(action);
  }));
});
