import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { AddPlayingComponent } from './add-playing.component';

import { UserService } from '../../../auth/services/user.service';

import * as appActions from '../../../../actions/app.actions';
import * as actions from '../../actions/add-playing.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromCompletion from '../../reducers/root.reducer';

import { HistoryGrouping } from '../../../../shared/models';
import { AddPlayingInfo } from '../../models';

import { filterPlatforms, filterStartTimes } from '../../../../shared/utils/history-filter.utils';

describe('AddPlayingComponent', () => {
  let store: Store<fromRoot.State>;
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestWrapperComponent,
        AddPlayingComponent
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

    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should call UserService getUser', async(() => {
    expect(userService.getUser).toHaveBeenCalled();
  }));

  describe('Game Value Changes', () => {
    it('Should dispatch SetGame', async(() => {
      const gameEl = fixture.nativeElement.querySelector('.game ng-select');
      component.game = testGame;
      fixture.detectChanges();

      gameEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      const action = new actions.SetGame(testGame);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));
  });

  describe('Game Value Clears', () => {
    it('Should dispatch Reset', async(() => {
      const gameEl = fixture.nativeElement.querySelector('.game ng-select');
      component.game = null;
      fixture.detectChanges();

      gameEl.dispatchEvent(new Event('clear'));
      fixture.detectChanges();

      const action = new actions.Reset();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));
  });

  describe('Platform Option Changes', () => {
    it('Should dispatch SetPlatform', async(() => {
      component.game = testGame;
      component.platforms = filterPlatforms(testGroupings, testGame);
      fixture.detectChanges();

      const platformEl = fixture.nativeElement.querySelector('.platform select');
      platformEl.disabled = false;
      platformEl.selectedIndex = 2;
      platformEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      const platform = component.platforms[1];
      const action = new actions.SetPlatform(platform);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));
  });

  describe('StartTime Option Changes', () => {
    it('Should dispatch SetStartTime', async(() => {
      component.game = testGame;
      component.platforms = filterPlatforms(testGroupings, testGame);
      const platform = component.platforms[1];
      component.dates = filterStartTimes(testGroupings, testGame, platform);
      fixture.detectChanges();

      const startTimeEl = fixture.nativeElement.querySelector('.startTime select');
      startTimeEl.disabled = false;
      startTimeEl.selectedIndex = 1;
      startTimeEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      const startTime = component.dates[0];
      const action = new actions.SetStartTime(startTime);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));
  });

  describe('Save Button Clicked', () => {
    let saveButtonEl: any;

    beforeEach(async(() => {
      saveButtonEl = fixture.nativeElement.querySelector('.save button');
      saveButtonEl.disabled = false;
    }));

    describe('With Match', () => {
      it('Should dispatch Save', async(() => {
        component.info = {
          game: testGame,
          platform: 'Platform 1',
          startTime: 3000
        };
        fixture.detectChanges();

        saveButtonEl.click();
        fixture.detectChanges();
        const action = new actions.Save({
          userId: testUserId,
          startEntryId: '2'
        });

        expect(store.dispatch).toHaveBeenCalledWith(action);
      }));
    });

    describe('Without Match', () => {
      it('Should dispatch Error', async(() => {
        component.game = null;
        saveButtonEl.click();
        fixture.detectChanges();

        const action = new appActions.Error(actions.SAVE, 'No matching history item found.');

        expect(store.dispatch).toHaveBeenCalledWith(action);
      }));
    });
  });
});

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-wrapper',
  template: `
    <app-completion-add-playing [gameGroupings]="gameGroupings"
                                [games]="games"
                                [game]="game"
                                [info]="info"
                                [platforms]="platforms"
                                [dates]="dates"></app-completion-add-playing>
`
})
class TestWrapperComponent implements OnInit {
  gameGroupings: HistoryGrouping[] = testGroupings;
  games: string[] = [testGame];
  game: string | null;
  info: AddPlayingInfo = {
    game: '',
    platform: '',
    startTime: 0
  };
  platforms: string[] = [];
  dates: number[] = [];

  ngOnInit() { }
}

const testGame = 'Game 1';
const testGroupings: HistoryGrouping[] = [{
  key: testGame,
  historyItems: [{
    id: '3',
    game: testGame,
    platform: 'Platform 1',
    startTime: 5000,
    endTime: 6000,
    dateRange: [new Date(5000), new Date(6000)],
    locked: false
  }, {
    id: '2',
    game: testGame,
    platform: 'Platform 1',
    startTime: 3000,
    endTime: 4000,
    dateRange: [new Date(3000), new Date(4000)],
    locked: false
  }, {
    id: '1',
    game: testGame,
    platform: 'Platform 2',
    startTime: 1000,
    endTime: 2000,
    dateRange: [new Date(1000), new Date(2000)],
    locked: false
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
