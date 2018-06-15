import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { PlayingItemComponent } from './playing-item.component';

import { UserService } from '../../../auth/services/user.service';

import { TimePipe } from '../../../../shared/pipes/time.pipe';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromCompletion from '../../reducers/root.reducer';

describe('PlayingItemComponent', () => {
  let store: Store<fromRoot.State>;
  let component: PlayingItemComponent;
  let fixture: ComponentFixture<PlayingItemComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlayingItemComponent,
        TimePipe
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'completion': combineReducers(fromCompletion.reducers)
        })
      ],
      providers: [{ provide: UserService, useValue: userServiceStub }],
    }).compileComponents();

    userService = TestBed.get(UserService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(PlayingItemComponent);
    component = fixture.componentInstance;
    component.displayData = {
      item: {
        id: '1',
        startEntryId: 'start 1',
        endEntryId: ''
      },
      startEntryData: {
        id: 'start 1',
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 6000,
        dateRange: [new Date(3000), new Date(6000)]
      }
    };
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should call UserService getUser', () => {
    expect(userService.getUser).toHaveBeenCalled();
  });
});

const testUserId = 'some id';
const userServiceStub = {
  getUser: jasmine.createSpy('getUser').and.returnValue({
    uid: testUserId,
    displayName: 'Jim Bob',
    email: 'jimbob@jimbob.com',
    photoURL: 'jimbob.com/jimbob.png'
  })
};
