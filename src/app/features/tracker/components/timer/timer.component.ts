import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as actions from '../../actions/timer';

@Component({
  selector: 'app-tracker-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  @Input() active: boolean;
  @Input() game: string;
  @Input() platform: string;
  @Input() platforms: string[];
  @Input() startDate: Date;
  @Input() currentTime: Date;
  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  getElapsedTime(startDate: Date, currentTime: Date): string {
    if (this.isValidDate(startDate) && this.isValidDate(currentTime)) {
      const elapsedTime = currentTime.valueOf() - startDate.valueOf();
      return new Date(elapsedTime).toISOString().substring(11, 19);
    }
    return '00:00:00';
  }

  isValidDate(date: Date): boolean {
    return date && !isNaN(date.getTime());
  }

  startTimer() {
    this.store.dispatch(new actions.TimerStart());
  }

  stopTimer() {
    this.store.dispatch(new actions.TimerStop(new Date()));
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
