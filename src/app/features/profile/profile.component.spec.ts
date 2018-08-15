import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { ProfileComponent } from './profile.component';

import { UserService } from '../auth/services/user.service';

// import * as profileActions from './actions/profile.actions';
import * as fromRoot from '../../reducers/root.reducer';
import * as fromProfile from './reducers/root.reducer';

import { user } from '../../test-helpers';

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
      providers: [{ provide: UserService, useValue: user.userServiceStub }]
    }).compileComponents();

    store = TestBed.get(Store);
    userService = TestBed.get(UserService);

    spyOn(store, 'select').and.callThrough();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should call UserService getUser', async(() => {
    expect(userService.getUser).toHaveBeenCalled();
  }));
});
