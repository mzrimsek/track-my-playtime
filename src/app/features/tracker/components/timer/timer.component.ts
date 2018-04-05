import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { faBan, faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

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
  @Input() currentTime: Date;
  @Input() platformsOptions: string[] = [];
  userId = '';
  icons = {
    start: faPlayCircle,
    stop: faStopCircle,
    cancel: faBan
  };
  constructor(private store: Store<State>, private userService: UserService) {
    this.userId = this.userService.getUser().uid;
  }

  ngOnInit() { }

  startTimer() {
    this.store.dispatch(new actions.StartTimer());
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
  }

  cancelTimer() {
    this.store.dispatch(new actions.CancelTimer());
  }

  setGame(gameEl: HTMLInputElement) {
    if (gameEl.value) {
      this.store.dispatch(new actions.SetGame(gameEl.value));

    }
  }

  setPlatform(platformEl: HTMLSelectElement) {
    if (platformEl.value) {
      this.store.dispatch(new actions.SetPlatform(platformEl.value));
    }
  }

  setStartTime(startTimeEl: HTMLInputElement) {
    if (startTimeEl.value) {
      const startTime = new Date(startTimeEl.value).getTime();
      this.store.dispatch(new actions.SetStartTime(startTime));
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
