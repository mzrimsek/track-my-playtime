import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { TimerInfo, AddTimerInfo } from '../../models';
import { State } from '../../reducers';
import * as actions from '../../actions/timer.actions';

@Component({
  selector: 'app-tracker-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  @Input() info: TimerInfo;
  @Input() currentTime: Date;
  @Input() platformsOptions: string[];
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  startTimer() {
    this.store.dispatch(new actions.StartTimer());
  }

  stopTimer() {
    const info = <AddTimerInfo>{
      game: this.info.game,
      platform: this.info.platform,
      startDate: moment(this.info.startDate).toDate(),
      endDate: new Date()
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
