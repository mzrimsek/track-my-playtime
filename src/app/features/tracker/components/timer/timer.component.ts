import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimerInfo } from '../../models';
import { State } from '../../reducers';
import * as actions from '../../actions/timer';

@Component({
  selector: 'app-tracker-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  @Input() info: TimerInfo;
  @Input() elapsedTime: string;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.elapsedTime = '00:00:00';
  }

  startTimer() {
    this.store.dispatch(new actions.StartTimer());
  }

  stopTimer() {
    this.store.dispatch(new actions.SaveTimerInfo(this.info, new Date()));
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
