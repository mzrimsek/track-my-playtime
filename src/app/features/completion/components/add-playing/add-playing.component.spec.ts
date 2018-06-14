import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { AddPlayingComponent } from './add-playing.component';

import { UserService } from '../../../auth/services/user.service';

import * as appActions from '../../../../actions/app.actions';
import * as actions from '../../actions/add-playing.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromCompletion from '../../reducers/root.reducer';

import { HistoryGrouping } from '../../../../shared/models';

describe('AddPlayingComponent', () => {
  let store: Store<fromRoot.State>;
  let component: AddPlayingComponent;
  let fixture: ComponentFixture<AddPlayingComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlayingComponent],
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

    fixture = TestBed.createComponent(AddPlayingComponent);
    component = fixture.componentInstance;
    component.info = {
      game: '',
      platform: '',
      startTime: 0
    };
    component.gameGroupings = testGroupings;
    component.games = ['Game 1'];
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should call UserService getUser', () => {
    expect(userService.getUser).toHaveBeenCalled();
  });

  describe('Game Value Changes', () => {
    let gameEl: any;

    beforeEach(async(() => {
      gameEl = fixture.nativeElement.querySelector('.game ng-select');
      component.game = testGame;
      gameEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }));

    it('Should dispatch SetGame', async(() => {
      const action = new actions.SetGame(testGame);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));

    it('Should update platforms', async(() => {
      expect(component.platforms).toEqual(['Platform 1', 'Platform 2']);
    }));
  });

  describe('Game Value Clears', () => {
    let gameEl: any;

    beforeEach(async(() => {
      gameEl = fixture.nativeElement.querySelector('.game ng-select');
      component.game = null;
      gameEl.dispatchEvent(new Event('clear'));
      fixture.detectChanges();
    }));

    it('Should dispatch Reset', async(() => {
      const action = new actions.Reset();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));

    it('Should update platforms', () => {
      expect(component.platforms).toEqual([]);
    });

    it('Should update dates', () => {
      expect(component.dates).toEqual([]);
    });
  });

  // TODO: Make these tests better
  describe('Platform Option Changes', () => {
    let platformEl: any;

    beforeEach(async(() => {
      const gameEl = fixture.nativeElement.querySelector('.game ng-select');
      component.game = testGame;
      gameEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      platformEl = fixture.nativeElement.querySelector('.platform select');
      platformEl.selectedIndex = 2;
      platformEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }));

    it('Should dispatch SetPlatform', async(() => {
      const platform = component.platforms[1];
      const action = new actions.SetPlatform(platform);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));

    it('Should update dates', async(() => {
      expect(component.dates).toEqual([1000]);
    }));
  });

  // TODO: Make these tests better
  describe('StartTime Option Changes', () => {
    let startTimeEl: any;

    beforeEach(async(() => {
      const gameEl = fixture.nativeElement.querySelector('.game ng-select');
      component.game = testGame;
      gameEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      const platformEl = fixture.nativeElement.querySelector('.platform select');
      platformEl.selectedIndex = 2;
      platformEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      startTimeEl = fixture.nativeElement.querySelector('.startTime select');
      startTimeEl.selectedIndex = 1;
      startTimeEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }));

    it('Should dispatch SetStartTime', async(() => {
      const startTime = component.dates[0];
      const action = new actions.SetStartTime(startTime);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));
  });

  describe('Save Button Clicked', () => {
    let saveButtonEl: any;

    beforeEach(async(() => {
      saveButtonEl = fixture.nativeElement.querySelector('.save button');
    }));

    describe('With Match', () => {
      beforeEach(async(() => {
        component.game = testGame;
        component.info = {
          game: testGame,
          platform: 'Platform 1',
          startTime: 3000
        };
        saveButtonEl.click();
        fixture.detectChanges();
      }));

      it('Should dispatch Save', () => {
        const action = new actions.Save({
          userId: testUserId,
          startEntryId: '2'
        });
        expect(store.dispatch).toHaveBeenCalledWith(action);
      });
    });

    describe('Without Match', () => {
      beforeEach(async(() => {
        component.game = null;
        saveButtonEl.click();
        fixture.detectChanges();
      }));

      it('Should dispatch Error', () => {
        const action = new appActions.Error(actions.SAVE, 'No matching history item found.');
        expect(store.dispatch).toHaveBeenCalledWith(action);
      });
    });
  });
});

const testGame = 'Game 1';
const testGroupings: HistoryGrouping[] = [{
  key: testGame,
  historyItems: [{
    id: '3',
    game: testGame,
    platform: 'Platform 1',
    startTime: 5000,
    endTime: 6000,
    dateRange: [new Date(5000), new Date(6000)]
  }, {
    id: '2',
    game: testGame,
    platform: 'Platform 1',
    startTime: 3000,
    endTime: 4000,
    dateRange: [new Date(3000), new Date(4000)]
  }, {
    id: '1',
    game: testGame,
    platform: 'Platform 2',
    startTime: 1000,
    endTime: 2000,
    dateRange: [new Date(1000), new Date(2000)]
  }],
  totalTime: 3
}];

const testUserId = 'some id';
const userServiceStub = {
  getUser: jasmine.createSpy('getUser').and.returnValue({
    uid: testUserId,
    displayName: 'Jim Bob',
    email: 'jimbob@jimbob.com',
    photoURL: 'jimbob.com/jimbob.png'
  })
};
