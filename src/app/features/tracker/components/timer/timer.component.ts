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
  @Input() currentTime: number;
  @Input() platformsOptions: string[] = [];
  userId = '';
  icons = {
    start: faPlayCircle,
    stop: faStopCircle,
    cancel: faBan
  };
  constructor(private store: Store<State>, private userService: UserService, private timerService: TimerService) {
    this.userId = this.userService.getUser().uid;
  }

  ngOnInit() { }

  startTimer() {
    const startTime = new Date().getTime();
    this.store.dispatch(new actions.StartTimer(startTime));
    this.timerService.setStartTime(this.userId, startTime);
  }

  stopTimer() {
    const info = <AddTimerInfo>{
      userId: this.userId,
      game: this.info.game,
      platform: this.info.platform,
      startTime: this.info.startTime,
      endTime: new Date().getTime()
    };
    this.store.dispatch(new actions.SaveTimerInfo(info));
    this.timerService.resetTimer(this.userId);
  }

  cancelTimer() {
    this.store.dispatch(new actions.CancelTimer());
  }

  setGame(gameEl: HTMLInputElement) {
    if (gameEl.value) {
      const game = gameEl.value;
      this.store.dispatch(new actions.SetGame(game));
      this.timerService.setGame(this.userId, game);
    }
  }

  setPlatform(platformEl: HTMLSelectElement) {
    if (platformEl.value) {
      const platform = platformEl.value;
      this.store.dispatch(new actions.SetPlatform(platform));
      this.timerService.setPlatform(this.userId, platform);
    }
  }

  setStartTime(startTimeEl: HTMLInputElement) {
    if (startTimeEl.value) {
      const startTime = new Date(startTimeEl.value).getTime();
      this.store.dispatch(new actions.SetStartTime(startTime));
      this.timerService.setStartTime(this.userId, startTime);
    }
  }

  openDateTimePicker(el: HTMLInputElement) {
    if (this.info.active) {
      el.click();
    }
  }

  getCurrentTimeDate(): Date {
    return new Date(this.currentTime);
  }
}
