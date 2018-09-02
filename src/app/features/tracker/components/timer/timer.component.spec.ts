import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { subHours } from 'date-fns';

import { TimerComponent } from './timer.component';

import { UserService } from '../../../auth/services/user.service';
import { TimerService } from '../../services/timer.service';

import { ElapsedTimePipe } from '../../../../shared/pipes/elapsed-time.pipe';

import * as actions from '../../actions/timer.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromTracker from '../../reducers/root.reducer';

import { platforms, tracker, user } from '../../../../test-helpers';

describe('TimerComponent', () => {
  let store: Store<fromRoot.State>;
  let userService: UserService;
  let timerService: TimerService;
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  const initTests = () => {
    TestBed.configureTestingModule({
      declarations: [
        TimerComponent,
        ElapsedTimePipe
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tracker': combineReducers(fromTracker.reducers)
        })
      ],
      providers: [
        { provide: UserService, useValue: user.userServiceStub },
        { provide: TimerService, useValue: tracker.timerServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    userService = TestBed.get(UserService);
    timerService = TestBed.get(TimerService);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    component.info = tracker.testInfo;
    component.platformsOptions = platforms.testPlatforms;
    component.elapsedTime = testElapsedTime;
    fixture.detectChanges();
  };

  describe('Render', () => {
    beforeEach(async(() => {
      initTests();
    }));

    it('Should create the component', async(() => {
      expect(component).toBeTruthy();
    }));

    it('Should call UserService getUser', () => {
      expect(userService.getUser).toHaveBeenCalled();
    });
  });

  describe('Timer Inactive', () => {
    beforeEach(async(() => {
      initTests();
    }));

    it('Should show start button', async(() => {
      const startButton = fixture.nativeElement.querySelector('.primary-action .start');
      expect(startButton).toBeTruthy();
    }));

    it('Should not show stop button', async(() => {
      const stopButton = fixture.nativeElement.querySelector('.primary-action .stop');
      expect(stopButton).toBeNull();
    }));

    it('Should not show cancel button', async(() => {
      const cancelButton = fixture.nativeElement.querySelector('.secondary-action .cancel');
      expect(cancelButton).toBeNull();
    }));

    it('Should show correct elapsed time', async(() => {
      const timerStartEl = fixture.nativeElement.querySelector('.time > div');
      expect(timerStartEl.innerText).toBe('00:00:00');
    }));

    describe('Start Button Click', () => {
      const start = new Date();
      let startButton: any;

      beforeEach(async(() => {
        startButton = fixture.nativeElement.querySelector('.primary-action .start');
        tracker.timerServiceStub.getNowTime.and.returnValue(start.getTime());
      }));

      it('Should dispatch SetStartTime', async(() => {
        const action = new actions.SetStartTime(start.getTime());
        startButton.click();
        expect(store.dispatch).toHaveBeenCalledWith(action);
      }));

      it('Should call TimerService setTimer', async(() => {
        startButton.click();
        expect(timerService.setTimer).toHaveBeenCalledWith(user.mockUser.uid, {
          ...tracker.testInfo,
          startTime: start.getTime()
        });
      }));
    });

    describe('Game Value Changes', () => {
      const game = 'some crazy new game';
      let gameEl: any;

      beforeEach(async(() => {
        gameEl = fixture.nativeElement.querySelector('.game ng-select');
        component.game = game;
        gameEl.dispatchEvent(new Event('change'));
        fixture.detectChanges();
      }));

      it('Should dispatch SetGame', async(() => {
        const action = new actions.SetGame(game);
        expect(store.dispatch).toHaveBeenCalledWith(action);
      }));

      it('Should not call TimerService setGame', () => {
        expect(timerService.setGame).not.toHaveBeenCalled();
      });
    });

    describe('Game Value Clears', () => {
      let gameEl: any;

      beforeEach(async(() => {
        gameEl = fixture.nativeElement.querySelector('.game ng-select');
        component.game = null;
        gameEl.dispatchEvent(new Event('clear'));
        fixture.detectChanges();
      }));

      it('Should dispatch SetGame', async(() => {
        const action = new actions.SetGame('');
        expect(store.dispatch).toHaveBeenCalledWith(action);
      }));

      it('Should not call TimerService setGame', () => {
        expect(timerService.setGame).not.toHaveBeenCalled();
      });
    });

    describe('Platform Option Changes', () => {
      let platformEl: any;

      beforeEach(async(() => {
        platformEl = fixture.nativeElement.querySelector('.platform select');
        platformEl.selectedIndex = 2;
        platformEl.dispatchEvent(new Event('change'));
        fixture.detectChanges();
      }));

      it('Should dispatch SetPlatform', async(() => {
        const platform = platforms.testPlatforms[1];
        const action = new actions.SetPlatform(platform);

        expect(store.dispatch).toHaveBeenCalledWith(action);
      }));

      it('Should not call TimerService setPlatform', () => {
        expect(timerService.setPlatform).not.toHaveBeenCalled();
      });
    });

    describe('Start Time', () => {
      it('Should call openDateTimePicker on click', async(() => {
        const timerStartEl = fixture.nativeElement.querySelector('.time > div');
        spyOn(component, 'openDateTimePicker');

        timerStartEl.click();

        expect(component.openDateTimePicker).toHaveBeenCalled();
      }));

      describe('Date Time Value Changes', () => {
        const startTime = 3000;
        let dateTimeEl: any;

        beforeEach(async(() => {
          dateTimeEl = fixture.nativeElement.querySelector('.date-time-picker input');
          dateTimeEl.value = new Date(startTime);
          dateTimeEl.dispatchEvent(new Event('dateTimeChange'));
          fixture.detectChanges();
        }));

        it('Should dispatch SetStartTime', async(() => {
          const action = new actions.SetStartTime(startTime);
          expect(store.dispatch).toHaveBeenCalledWith(action);
        }));

        it('Should not call TimerService setStartTime', async(() => {
          expect(timerService.setStartTime).not.toHaveBeenCalled();
        }));
      });
    });
  });

  describe('Timer Active', () => {
    const end = new Date();

    beforeEach(async(() => {
      tracker.testInfo.startTime = subHours(end, 1).getTime();
      testElapsedTime = '01:00:00';
      initTests();
    }));

    it('Should not show start button', async(() => {
      const startButton = fixture.nativeElement.querySelector('.primary-action .start');
      expect(startButton).toBeNull();
    }));

    it('Should show stop button', async(() => {
      const stopButton = fixture.nativeElement.querySelector('.primary-action .stop');
      expect(stopButton).toBeTruthy();
    }));

    it('Should show cancel button', async(() => {
      const cancelButton = fixture.nativeElement.querySelector('.secondary-action .cancel');
      expect(cancelButton).toBeTruthy();
    }));

    it('Should show correct elapsed time', async(() => {
      const timerStartEl = fixture.nativeElement.querySelector('.time > div');
      expect(timerStartEl.innerText).toBe('01:00:00');
    }));

    describe('Stop Button Click', () => {
      let stopButton: any;

      beforeEach(async(() => {
        stopButton = fixture.nativeElement.querySelector('.primary-action .stop');
        tracker.timerServiceStub.getNowTime.and.returnValue(end.getTime());
      }));

      it('Should dispatch SaveTimerInfo', async(() => {
        const action = new actions.SaveTimerInfo({
          userId: user.mockUser.uid,
          ...tracker.testInfo,
          endTime: end.getTime()
        });
        stopButton.click();
        expect(store.dispatch).toHaveBeenCalledWith(action);
      }));

      it('Should call TimerService resetTimer', async(() => {
        stopButton.click();
        expect(timerService.resetTimer).toHaveBeenCalledWith(user.mockUser.uid);
      }));
    });

    describe('Cancel Button Click', () => {
      let cancelButton: any;

      beforeEach(async(() => {
        cancelButton = fixture.nativeElement.querySelector('.secondary-action .cancel');
      }));

      it('Should dispatch CancelTimer', async(() => {
        cancelButton.click();
        expect(store.dispatch).toHaveBeenCalledWith(new actions.CancelTimer());
      }));

      it('Should call TimerService resetTimer', async(() => {
        cancelButton.click();
        expect(timerService.resetTimer).toHaveBeenCalledWith(user.mockUser.uid);
      }));
    });

    describe('Game', () => {
      it('Should call TimerService setGame when game value changes', async(() => {
        const game = 'some crazy new game';
        const gameEl = fixture.nativeElement.querySelector('.game ng-select');

        component.game = game;
        gameEl.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        expect(timerService.setGame).toHaveBeenCalledWith(user.mockUser.uid, game);
      }));

      it('Should call TimerService setGame when game value clears', async(() => {
        const game = null;
        const gameEl = fixture.nativeElement.querySelector('.game ng-select');

        component.game = game;
        gameEl.dispatchEvent(new Event('clear'));
        fixture.detectChanges();

        expect(timerService.setGame).toHaveBeenCalledWith(user.mockUser.uid, '');
      }));
    });

    describe('Platform', () => {
      it('Should call TimerService  setPlatform when platform option changes', async(() => {
        const platform = platforms.testPlatforms[1];
        const platformEl = fixture.nativeElement.querySelector('.platform select');

        platformEl.selectedIndex = 2;
        platformEl.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        expect(timerService.setPlatform).toHaveBeenCalledWith(user.mockUser.uid, platform);
      }));
    });

    describe('Start Time', () => {
      it('Should call TimerService setStartTime when date time value changes', async(() => {
        const startTime = 3000;
        const dateTimeEl = fixture.nativeElement.querySelector('.date-time-picker input');

        dateTimeEl.value = new Date(startTime);
        dateTimeEl.dispatchEvent(new Event('dateTimeChange'));
        fixture.detectChanges();

        expect(timerService.setStartTime).toHaveBeenCalledWith(user.mockUser.uid, startTime);
      }));
    });
  });
});

let testElapsedTime = '00:00:00';
