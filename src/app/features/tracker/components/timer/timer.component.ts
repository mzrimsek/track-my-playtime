import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

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
  @Input() userId = '';
  constructor(private store: Store<State>) { }

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
}
