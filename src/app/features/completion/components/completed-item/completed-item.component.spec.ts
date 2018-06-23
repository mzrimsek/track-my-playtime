import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { CompletedItemComponent } from './completed-item.component';

import { UserService } from '../../../auth/services/user.service';

import { TimePipe } from '../../../../shared/pipes/time.pipe';

import * as progressActions from '../../actions/progress.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromCompletion from '../../reducers/root.reducer';

describe('CompletedItemComponent', () => {
  let store: Store<fromRoot.State>;
  let component: CompletedItemComponent;
  let fixture: ComponentFixture<CompletedItemComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompletedItemComponent,
        TimePipe
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'completion': combineReducers(fromCompletion.reducers)
        })
      ],
      providers: [{ provide: UserService, useValue: userServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    userService = TestBed.get(UserService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(CompletedItemComponent);
    component = fixture.componentInstance;
    component.displayData = {
      item: {
        id: '1',
        startEntryId: 'start 1',
        endEntryId: 'end 1'
      },
      completedItem: {
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 8000,
        timePlayed: 3
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

  it('Should dispatch RemoveProgressItem when remove button is clicked', () => {
    const removeButton = fixture.nativeElement.querySelector('button');
    removeButton.click();
    expect(store.dispatch).toHaveBeenCalledWith(new progressActions.RemoveProgressItem(testUserId, '1'));
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
