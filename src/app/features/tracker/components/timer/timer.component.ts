import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { faBan, faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';
import { TimerService } from '../../services/timer.service';

import * as actions from '../../actions/timer.actions';

import { State } from '../../reducers/root.reducer';

import { AddTimerInfo, TimerInfo } from '../../models';

@Component({
  selector: 'app-tracker-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  @Input() info: TimerInfo;
  @Input() currentTime = 0;
  @Input() platformsOptions: string[] = [];
  @Input() trackedGames: string[] = [];
  @Input() game: string | null = null;
  userId = '';
  icons = {
    start: faPlayCircle,
    stop: faStopCircle,
    cancel: faBan
  };
  constructor(private store: Store<State>, private userService: UserService, private timerService: TimerService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.userId = user.uid);
  }

  startTimer() {
    const now = this.timerService.getNowTime();
    this.store.dispatch(new actions.SetStartTime(now));
    this.timerService.setTimer(this.userId, {
      ...this.info,
      startTime: now
    });
  }

  stopTimer() {
    const info = <AddTimerInfo>{
      userId: this.userId,
      game: this.info.game,
      platform: this.info.platform,
      startTime: this.info.startTime,
      endTime: this.timerService.getNowTime()
    };
    this.store.dispatch(new actions.SaveTimerInfo(info));
    this.timerService.resetTimer(this.userId);
  }

  cancelTimer() {
    this.store.dispatch(new actions.CancelTimer());
    this.timerService.resetTimer(this.userId);
  }

  setGame() {
    if (this.game) {
      const game = this.game;
      this.store.dispatch(new actions.SetGame(game));
      if (this.info.startTime !== 0) {
        this.timerService.setGame(this.userId, game);
      }
    }
  }

  resetGame() {
    this.store.dispatch(new actions.SetGame(''));
    if (this.info.startTime !== 0) {
      this.timerService.setGame(this.userId, '');
    }
  }

  setPlatform(platformEl: HTMLSelectElement) {
    const platform = platformEl.value;
    this.store.dispatch(new actions.SetPlatform(platform));
    if (this.info.startTime !== 0) {
      this.timerService.setPlatform(this.userId, platform);
    }
  }

  setStartTime(startTimeEl: HTMLInputElement) {
    if (startTimeEl.value) {
      const startTime = new Date(startTimeEl.value).getTime();
      this.store.dispatch(new actions.SetStartTime(startTime));
      if (this.info.startTime !== 0) {
        this.timerService.setStartTime(this.userId, startTime);
      }
    }
  }

  openDateTimePicker(el: HTMLInputElement) {
    if (this.info.startTime !== 0) {
      el.click();
    }
  }

  getCurrentTimeDate(): Date {
    return new Date(this.currentTime);
  }
}
